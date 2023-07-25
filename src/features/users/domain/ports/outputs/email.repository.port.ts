import { EmailOptions } from '../../../../../core/types';

export interface EmailServicePort {
	sendEmail(options: EmailOptions): Promise<void>;
}
