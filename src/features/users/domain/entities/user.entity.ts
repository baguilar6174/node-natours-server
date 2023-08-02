export interface User {
	_id: string;
	name: string;
	email: string;
	photo: string;
	role: string;
	passwordChangeAt?: Date;
}
