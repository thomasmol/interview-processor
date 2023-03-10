import type { RequestHandler } from './$types';
import prisma from '$lib/database';
import type { Audio } from '@prisma/client';


export const GET = (async ({ locals, params }) => {
	const session = await locals.getSession();
	const audio: Audio = await prisma.audio.findFirstOrThrow({
		where: {
			//@ts-expect-error issue https://authjs.dev/reference/utilities
			userId: session?.user?.id ?? 'anonymous',
      id: params.id
		}
	});
	return new Response(JSON.stringify(audio));
}) satisfies RequestHandler;
