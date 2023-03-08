import type { RequestHandler } from './$types';
import openai from '$lib/openai';

export const POST = (async ({ request }) => {
	const data = await request.formData();
	const transcript = data.get('transcript') as string;
	const prompt = data.get('prompt') as string;
	let summary = `Summary of ${prompt}: \n `;

	try {
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
		summary = 'Sorry, something went wrong. Please try again. Error: ' + error;
	}
	return new Response(JSON.stringify({ summary }));
}) satisfies RequestHandler;
