import banana from '@banana-dev/banana-dev';
import { PRIVATE_BANANA_API_KEY, PRIVATE_BANANA_MODEL_KEY } from '$env/static/private';

const apiKey = PRIVATE_BANANA_API_KEY;
const modelKey = PRIVATE_BANANA_MODEL_KEY;
const input = {
	mp3BytesString: ''
};

const result = await banana.run(apiKey, modelKey, input);

console.log(result);
