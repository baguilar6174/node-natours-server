import {
	Auth,
	ForgotPasswordDTO,
	ResetPasswordDTO,
	SignInDTO,
	SignUpDTO,
	UpdatePasswordDTO,
	UpdateUserDataDTO,
	User
} from '../../entities';

export interface AuthRepositoryPort {
	signup(data: SignUpDTO): Promise<Auth>;
	login(data: SignInDTO): Promise<Auth>;
	forgotPassword(data: ForgotPasswordDTO): Promise<string>;
	resetPassword(data: ResetPasswordDTO): Promise<Auth>;
	updatePassword(data: UpdatePasswordDTO): Promise<Auth>;
	updateUserData(data: UpdateUserDataDTO): Promise<User>;
	deleteAccount(id: Pick<User, '_id'>): Promise<User>;
}
