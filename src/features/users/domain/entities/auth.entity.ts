import { User } from './user.entity';

export interface Auth {
	user: User;
	token: string;
}

export type SignUpDTO = Omit<User, '_id' | 'passwordChangeAt'> & { password: string; passwordConfirm: string };
export type SignInDTO = Pick<User, 'email'> & { password: string };
export type ForgotPasswordDTO = Pick<User, 'email'> & { resetURL: string };
export type ResetPasswordDTO = { password: string; resetToken: string };
export type UpdatePasswordDTO = Pick<User, '_id'> & {
	currentPassword: string;
	newPassword: string;
	newPasswordConfirm: string;
};
export type UpdateUserDataDTO = Pick<User, '_id'> & {
	password: string;
	passwordConfirm: string;
	fields: Pick<User, 'email' | 'name'>; // Fields to update
};
