import type { RequestHandler } from './$types';
import prisma from '$lib/database';
import type { Audio } from '@prisma/client';

export const POST = (async ({ request, locals }) => {
	const { name, prompt, transcript, summary, audioDurationSeconds } = await request.json();
	const session = await locals.getSession();

	const audio: Audio = await prisma.audio.create({
		data: {
      //@ts-expect-error issue https://authjs.dev/reference/utilities
      userId: session?.user?.id,
      name,
      prompt,
      transcript,
      summary,
      audioDurationSeconds,
      createdAt: new Date(),
      updatedAt: new Date()
    }
	});

	return new Response(JSON.stringify(audio));
}) satisfies RequestHandler;

export const GET = (async ({ locals }) => {
	const session = await locals.getSession();
	const audios = await prisma.audio.findMany({
		where: {
			//@ts-expect-error issue https://authjs.dev/reference/utilities
			userId: session?.user?.id ?? 'anonymous'
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
	return new Response(JSON.stringify(audios));
}) satisfies RequestHandler;
