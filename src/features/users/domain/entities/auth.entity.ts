import { CreateUserDTO, User } from './user.entity';

export interface Auth {
	user: User;
	token: string;
}

export type SignUpDTO = CreateUserDTO & { passwordConfirm: string };
export type SignInDTO = Pick<User, 'email' | 'password'>;
export type ForgotPasswordDTO = Pick<User, 'email'> & { resetURL: string };
export type ResetPasswordDTO = Pick<User, 'password'> & { resetToken: string };
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
