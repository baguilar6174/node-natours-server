export interface User {
	_id: string;
	name: string;
	email: string;
	photo: string;
	password: string;
	role: string;
	active: boolean;
	passwordChangeAt?: Date;
}
