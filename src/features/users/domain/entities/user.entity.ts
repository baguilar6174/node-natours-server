export interface User {
	_id: string;
	name: string;
	email: string;
	photo: string;
	password: string;
	role: string;
	passwordChangeAt?: Date;
}

export type CreateUserDTO = Omit<User, '_id' | 'passwordChangeAt'>;
export type UpdateUserDTO = Partial<Omit<User, '_id'>>;
