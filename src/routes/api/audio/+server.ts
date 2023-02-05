import type { RequestHandler } from './$types';
import banana from '@banana-dev/banana-dev';
import openai from '$lib/openai';
import {
  PRIVATE_BANANA_API_KEY,
  PRIVATE_BANANA_WHISPER_BASE_MODEL_KEY,
  PRIVATE_BANANA_WHISPER_MEDIUM_MODEL_KEY
} from '$env/static/private';
const apiKey = PRIVATE_BANANA_API_KEY;
//const whisperBaseModelKey = PRIVATE_BANANA_WHISPER_BASE_MODEL_KEY;
const whisperMediumModelKey = PRIVATE_BANANA_WHISPER_MEDIUM_MODEL_KEY;

export const POST = (async ({ request })   =>{
  const {audio, prompt} = await request.json(); // must be mp3 file!
  /* const arrayBuffer = await file.arrayBuffer();
  const mp3 = Buffer.from(arrayBuffer).toString('base64'); */
  const modelPayload = { mp3BytesString: audio };
  const result : BananaTranscriptResponse = await banana.run(apiKey, whisperMediumModelKey, modelPayload) as BananaTranscriptResponse;
  const transcript = result.modelOutputs[0].text;

  const chunkSize = 6000;
  const overlapSize = 150;
  const chunks = [];
  let start = 0;
  while (start < transcript.length) {
    const end = start + chunkSize;
    chunks.push(transcript.substring(start, end));
    start = end - overlapSize;
  }
  let summary = '';
  for (let i = 0; i < chunks.length; i++) {
    const chunk :string = chunks[i];
    const response = await openai.createCompletion({
      prompt: 'This is a section of an interview about ' + prompt + '. Write a concise summary of the following section: ' + chunk,
      max_tokens: 1500,
      temperature: 0.5,
      model: 'text-davinci-003'
    });
    summary += response.data.choices[0].text;
  }

  return new Response(JSON.stringify({transcript, summary}));
}) satisfies RequestHandler;