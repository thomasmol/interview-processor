import type { RequestHandler } from './$types';
import banana from '@banana-dev/banana-dev';
import openai from '$lib/openai';
import {
  PRIVATE_BANANA_API_KEY,
  PRIVATE_BANANA_WHISPER_BASE_MODEL_KEY
} from '$env/static/private';
const apiKey = PRIVATE_BANANA_API_KEY;
const whisperBaseModelKey = PRIVATE_BANANA_WHISPER_BASE_MODEL_KEY;

export const POST = (async ({ request })   =>{
  const {audio, prompt} = await request.json(); // must be mp3 file!
  /* const arrayBuffer = await file.arrayBuffer();
  const mp3 = Buffer.from(arrayBuffer).toString('base64'); */
  const modelPayload = { mp3BytesString: audio };
  const result : BananaTranscriptResponse = await banana.run(apiKey, whisperBaseModelKey, modelPayload) as BananaTranscriptResponse;
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

  console.log(result);
  console.log(summary);
  return new Response(JSON.stringify({transcript, summary}));
}) satisfies RequestHandler;

/* {
  id: '8e0e2a6b-4e74-47cc-8cd7-4490b201f663',
  message: '',
  created: 1675353762,
  apiVersion: 'January 11, 2023',
  modelOutputs: [
    {
      text: ' Ja, eerst wil ik wat van jou weten over jouw onderzoekkontest. Kontext was benieuwd wat voor onderzoek je doet en hoe dit gerealtier het is aan bijvoorbeeld nutje. Dus bij onderzoek is het veel van kochtief modelleren en we namen nemen van beslissingen. Korte van mijn leven betekent eigenlijk dat je een familiel model, wiskwintermodell, of opstand.'
    }
  ]
} */