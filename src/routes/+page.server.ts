import type { Actions } from './$types';
import banana from '@banana-dev/banana-dev';
import { PRIVATE_BANANA_API_KEY, PRIVATE_BANANA_WHISPER_BASE_MODEL_KEY } from '$env/static/private';

const apiKey = PRIVATE_BANANA_API_KEY;
const whisperBaseModelKey = PRIVATE_BANANA_WHISPER_BASE_MODEL_KEY;


export const actions = {
  default: async ({request}) => {
    const data = await request.formData();
    const audioFile = data.get('file') as Blob; // must be mp3 file!
    const arrayBuffer = await audioFile.arrayBuffer();
    const mp3 = Buffer.from(arrayBuffer).toString('base64');
    const modelPayload = {"mp3BytesString":mp3};
    const result = await banana.run(apiKey, whisperBaseModelKey, modelPayload);
    console.log(result);
    return {
      status: 200,
      body: result
    };
  }
} satisfies Actions;

