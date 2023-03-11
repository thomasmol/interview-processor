import type { Actions } from './$types';
import { EMAIL_SERVER } from '$env/static/private';
import nodemailer from 'nodemailer';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = (data.get('email') as string) || '';
		const subject = (data.get('subject') as string) || '';
		const message = (data.get('message') as string) || '';

		const transporter = nodemailer.createTransport(EMAIL_SERVER);

		const mail = {
			from: email,
			to: 'interviewprocessor@thomasmol.com',
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
