import type { Actions } from './$types';
import { EMAIL_SERVER } from '$env/static/private';
import nodemailer from 'nodemailer';

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const email = (await locals.getSession())?.user?.email || 'no@email.com';
		const subject = (data.get('subject') as string) || 'Something went wrong with subject';
		const message = (data.get('message') as string) || 'Something went wrong with message';

		const transporter = nodemailer.createTransport(EMAIL_SERVER);

		const mail = {
			from: email,
			to: 'audiodigest@thomasmol.com',
			subject: subject,
			text: message
		};

		transporter.sendMail(mail, (err, info) => {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
			}
		});
		return { success: true };
	}
} satisfies Actions;
