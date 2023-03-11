import { SvelteKitAuth } from '@auth/sveltekit';
import EmailProvider from "next-auth/providers/email";
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '$lib/database';
import { EMAIL_SERVER, EMAIL_FROM } from '$env/static/private';


const authorization = (async ({ event, resolve }) => {
	const unprotectedRoutes = ['/login', '/demo'];
	const specialRoutes = ['/api/transcribe', '/api/summarize', '/'];
	// Protect any routes under unprotectedRoutes
	const session = await event.locals.getSession();
	if (!unprotectedRoutes.includes(event.url.pathname)) {
		if (!session && !specialRoutes.includes(event.url.pathname)) {
			throw redirect(303, '/login');
		}
	} else {
		if (session) {
			throw redirect(303, '/dashboard');
		}
	}

	// If the request is still here, just proceed as normally
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
	return result;
}) satisfies Handle;

export const handle = sequence(
	SvelteKitAuth({
		session: {
			// Choose how you want to save the user session.
			// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
			// If you use an `adapter` however, we default it to `"database"` instead.
			// You can still force a JWT session by explicitly defining `"jwt"`.
			// When using `"database"`, the session cookie will only contain a `sessionToken` value,
			// which is used to look up the session in the database.
			strategy: 'database',

			// Seconds - How long until an idle session expires and is no longer valid.
			maxAge: 30 * 24 * 60 * 60, // 30 days

			// Seconds - Throttle how frequently to write to database to extend a session.
			// Use it to limit write operations. Set to 0 to always update the database.
			// Note: This option is ignored if using JSON Web Tokens
			updateAge: 24 * 60 * 60, // 24 hours

			// The session token is usually either a random UUID or string, however if you
			// need a more customized session token string, you can define your own generate function.
			generateSessionToken: () => {
				return crypto.randomUUID();
			}
		},
		//@ts-expect-error issue https://github.com/nextauthjs/next-auth/discussions/6074
		adapter: PrismaAdapter(prisma),
		callbacks: {
			async session({ session, user }) {
				return {
					user: user,
					expires: session.expires
				};
			}
		} ,
		providers: [
			//@ts-expect-error issue ??
			EmailProvider({
				server: EMAIL_SERVER,
				from: EMAIL_FROM
			})
		]
	}),
	authorization
) satisfies Handle;
