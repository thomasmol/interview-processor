import type { RequestHandler } from './$types';
import openai from '$lib/openai';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';

export const POST = (async ({ request }) => {
	const data = await request.formData();
	// m4a, mp3, mp4, mpeg, mpga, wav, webm
	// max 25mb
	const formFile = data.get('file') as File;
	const prompt = data.get('prompt') as string;

	const formData = new FormData();
	formData.append('file', formFile, formFile.name);
	formData.append('model', 'whisper-1');
	formData.append('prompt', prompt);

	let transcript = '';
	let summary = `Summary of ${prompt}: \n `;

	try {
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
		transcript = transcribeData?.text || '';
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

		const chunkSize = 6000;
		const overlapSize = 150;
		const chunks = [];
		let start = 0;
		while (start < transcript.length) {
			const end = start + chunkSize;
			chunks.push(transcript.substring(start, end));
			start = end - overlapSize;
		}
		for (let i = 0; i < chunks.length; i++) {
			const chunk: string = chunks[i];
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
		summary = '-';
	}
	return new Response(JSON.stringify({ transcript, summary }));
}) satisfies RequestHandler;
