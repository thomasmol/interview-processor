import type { Audio } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const responseAudios = await fetch('/api/audios');
	const audios: Audio[] = await responseAudios.json();
	return { audios };
}) satisfies PageServerLoad;
