import nodemailer from 'nodemailer';

import { EmailServicePort } from '../../domain/ports/outputs';
import EnvConfig from '../../../../core/env.config';
import { EmailOptions } from '../../../../core/types';

export class EmailServiceAdapter implements EmailServicePort {
	async sendEmail(options: EmailOptions): Promise<void> {
		const { email, subject, text } = options;

		// * 1) Create a transporter
		const transporter = nodemailer.createTransport({
			auth: {
				user: EnvConfig.EMAIL_USERNAME,
				pass: EnvConfig.EMAIL_PASSWORD
			},
			host: EnvConfig.EMAIL_HOST,
			port: EnvConfig.EMAIL_PORT
		});
		// * 2) Define the mail options
		const mailOptions = {
			from: 'natours-server@dev.com',
			to: email,
			subject,
			text
		};
		// * 3) Actually send the email
		await transporter.sendMail(mailOptions);
	}
}
