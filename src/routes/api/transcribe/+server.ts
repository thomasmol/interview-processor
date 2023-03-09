import type { RequestHandler } from './$types';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';
import fs from 'fs';
import openai from '$lib/openai';
import splitAudio from '$lib/splitaudio';

export const POST = (async ({ request, fetch }) => {
	const data = await request.formData();
	// m4a, mp3, mp4, mpeg, mpga, wav, webm
	// max 25mb allowed by openai api, however, seems to not work with files larger than roughly 20mb
	const formFile = data.get('file') as File;
	const prompt = data.get('prompt') as string;

	let transcript = '';

	if (!formFile.type.startsWith('audio/'))
		return new Response('File type not supported.', { status: 400 });

	if (formFile.size > 15 * 1000 * 1000) {
		console.log('File size too large, splitting into chunks');
		const dateTime = new Date().toISOString().replace(/:/g, '-');
		const fileName = dateTime + '-' + formFile.name;
		fs.writeFile(
			'./static/audios/' + fileName,
			Buffer.from(await formFile.arrayBuffer()),
			(err) => {
				if (err) console.error(err);
				console.log(fileName, ' saved');
			}
		);

		const segmentDurationSeconds = 20 * 60;

		const chunkFilePaths = await splitAudio('./static/audios/' + fileName, segmentDurationSeconds);
		try {
			for(const filePath of chunkFilePaths) {
				console.log('Now transcribing: ', filePath);
				const response = await openai.createTranscription(
					fs.createReadStream(filePath) as any,
					'whisper-1',
					prompt
				);
				fs.unlinkSync(filePath);
				console.log('Removed: ', filePath);
				transcript += response.data.text + ' ';
			};
			fs.unlinkSync('./static/audios/' + fileName);
			console.log('Removed: ', fileName);
			return new Response(JSON.stringify({ transcript }));
		} catch (error) {
			console.error(error);
			fs.unlinkSync('./static/audios/' + fileName);
			chunkFilePaths.forEach((chunkFilePath) => {
				fs.unlinkSync(chunkFilePath);
			});
			transcript = 'Sorry, something went wrong. Please try again. Error: ' + error;
			return new Response(JSON.stringify({ transcript }));
		}
	}

	try {
		console.log('File small enough transcribing: ', formFile.name);
		const formData = new FormData();
		formData.append('file', formFile, formFile.name);
		formData.append('model', 'whisper-1');
		formData.append('prompt', prompt);

		const transcribeResponse = await fetch(`https://api.openai.com/v1/audio/transcriptions`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`,
				Accept: 'application/json'
			},
			body: formData
		});
		const transcribeData = await transcribeResponse.json();
		transcript += transcribeData?.text || '';
		return new Response(JSON.stringify({ transcript }));
	} catch (error) {
		console.error(error);
		transcript = 'Sorry, something went wrong. Please try again. Error: ' + error;
		return new Response(JSON.stringify({ transcript }));
	}
}) satisfies RequestHandler;
