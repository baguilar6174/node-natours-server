export interface User {
	_id: string;
	name: string;
	email: string;
	role: string;
	active: boolean;
	photo: string;
	password: string;
}

export type CreateUserDTO = Omit<User, '_id'>;
export type UpdateUserDTO = Partial<Omit<User, '_id'>>;
