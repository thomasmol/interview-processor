/* import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const response = await resolve(event);
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
	response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
	return response;
}) satisfies Handle;
 */