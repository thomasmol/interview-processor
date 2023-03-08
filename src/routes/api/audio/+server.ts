import type { RequestHandler } from './$types';
import openai from '$lib/openai';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';
import ffmpeg from 'fluent-ffmpeg';

export const POST = (async ({ request }) => {
	const data = await request.formData();
	// m4a, mp3, mp4, mpeg, mpga, wav, webm
	// max 25mb allowed by openai api, however, seems to not work with files larger than roughly 20mb
	const formFile = data.get('file') as File;
	const prompt = data.get('prompt') as string;
	
	let fileChunks: File[] = [formFile];

	if (!formFile.type.startsWith('audio/'))
		return new Response('File type not supported.', { status: 400 });

	if (formFile.size > 20 * 1000 * 1000) {
		fileChunks = [];
		// 20mb
		// split file into chunks
		const chunkSize = 15 * 1000 * 1000; // 15mb
		let start = 0;
		while (start < formFile.size) {
			const end = start + chunkSize;
			const name = 'start-' + start.toString() + '-end-' + end.toString() + formFile.name;
			const file = new File([formFile.slice(start, end)], name, {
				type: formFile.type,
				lastModified: Date.now()
			});
			fileChunks.push(file);
			start = end;
		}
	}

	let transcript = '';
	let summary = `Summary of ${prompt}: \n `;

	try {
		fileChunks.forEach(async (fileChunk) => {
			const formData = new FormData();
			console.log(fileChunk);
			formData.append('file', fileChunk, fileChunk.name);
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
			console.log(transcribeData);
			transcript += transcribeData?.text || '';
		});

		/* !! This is the code that works with the openai npm package,
		 but needs to updated to work with file uploads in forms !!
	try {
		const response = await openai.createTranscription(formFile as any, 'whisper-1');
		console.log(response);
		transcript = response.data.text;
	} catch (error) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
	} */

		const transcriptChunkSize = 6000;
		const overlapSize = 150;
		const transcriptChunks: string[] = [];
		let start = 0;
		while (start < transcript.length) {
			const end = start + transcriptChunkSize;
			transcriptChunks.push(transcript.substring(start, end));
			start = end - overlapSize;
		}
		for (let i = 0; i < transcriptChunks.length; i++) {
			const chunk: string = transcriptChunks[i];
			/* const response = await openai.createCompletion({
      prompt: 'This is a section of an interview about ' + prompt + '. Write a concise summary of the following section: ' + chunk,
      max_tokens: 1500,
      temperature: 0.5,
      model: 'davinci-003'
    });
    summary += response.data.choices[0].text; */

			const response = await openai.createChatCompletion({
				messages: [
					{
						role: 'user',
						content:
							'The following a section of an transcript of an interview about ' +
							prompt +
							'. Write a concise summary of the following section: ' +
							chunk
					}
				],
				max_tokens: 1500,
				temperature: 0.5,
				model: 'gpt-3.5-turbo'
			});
			summary += response.data.choices[0].message?.content + ' \n ' || '';
		}
	} catch (error) {
		console.error(error);
		transcript = 'Sorry, something went wrong. Please try again.';
		summary = 'Sorry, something went wrong. Please try again.';
	}
	return new Response(JSON.stringify({ transcript, summary }));
}) satisfies RequestHandler;
