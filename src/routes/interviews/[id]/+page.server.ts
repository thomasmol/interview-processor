import type { Audio } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const responseAudio = await fetch('/api/audios/' + params.id);
	const audio: Audio = await responseAudio.json();
	return { audio };
}) satisfies PageServerLoad;
