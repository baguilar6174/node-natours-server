import { SignUpDTO } from '../../domain/entities';

const genericAdminPassword = 'admin12345';
const genericUserPassword = 'user12345';
const genericGuidePassword = 'guide12345';
const genericLeadGuidePassword = 'lead-guide12345';

export const USERS_DATA: SignUpDTO[] = [
	{
		name: 'Jonas Schmedtmann',
		email: 'admin@natours.io',
		role: 'admin',
		photo: 'user-1.jpg',
		password: genericAdminPassword,
		passwordConfirm: genericAdminPassword
	},
	{
		name: 'Lourdes Browning',
		email: 'loulou@example.com',
		role: 'user',
		photo: 'user-2.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Sophie Louise Hart',
		email: 'sophie@example.com',
		role: 'user',
		photo: 'user-3.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Ayla Cornell',
		email: 'ayls@example.com',
		role: 'user',
		photo: 'user-4.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Leo Gillespie',
		email: 'leo@example.com',
		role: 'guide',
		photo: 'user-5.jpg',
		password: genericGuidePassword,
		passwordConfirm: genericGuidePassword
	},
	{
		name: 'Jennifer Hardy',
		email: 'jennifer@example.com',
		role: 'guide',
		photo: 'user-6.jpg',
		password: genericGuidePassword,
		passwordConfirm: genericGuidePassword
	},
	{
		name: 'Kate Morrison',
		email: 'kate@example.com',
		role: 'guide',
		photo: 'user-7.jpg',
		password: genericGuidePassword,
		passwordConfirm: genericGuidePassword
	},
	{
		name: 'Eliana Stout',
		email: 'eliana@example.com',
		role: 'user',
		photo: 'user-8.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Cristian Vega',
		email: 'chris@example.com',
		role: 'user',
		photo: 'user-9.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Steve T. Scaife',
		email: 'steve@example.com',
		role: 'lead-guide',
		photo: 'user-10.jpg',
		password: genericLeadGuidePassword,
		passwordConfirm: genericLeadGuidePassword
	},
	{
		name: 'Aarav Lynn',
		email: 'aarav@example.com',
		role: 'lead-guide',
		photo: 'user-11.jpg',
		password: genericLeadGuidePassword,
		passwordConfirm: genericLeadGuidePassword
	},
	{
		name: 'Miyah Myles',
		email: 'miyah@example.com',
		role: 'lead-guide',
		photo: 'user-12.jpg',
		password: genericLeadGuidePassword,
		passwordConfirm: genericLeadGuidePassword
	},
	{
		name: 'Ben Hadley',
		email: 'ben@example.com',
		role: 'guide',
		photo: 'user-13.jpg',
		password: genericGuidePassword,
		passwordConfirm: genericGuidePassword
	},
	{
		name: 'Laura Wilson',
		email: 'laura@example.com',
		role: 'user',
		photo: 'user-14.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Max Smith',
		email: 'max@example.com',
		role: 'user',
		photo: 'user-15.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Isabel Kirkland',
		email: 'isabel@example.com',
		role: 'user',
		photo: 'user-16.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Alexander Jones',
		email: 'alex@example.com',
		role: 'user',
		photo: 'user-17.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Eduardo Hernandez',
		email: 'edu@example.com',
		role: 'user',
		photo: 'user-18.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'John Riley',
		email: 'john@example.com',
		role: 'user',
		photo: 'user-19.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	},
	{
		name: 'Lisa Brown',
		email: 'lisa@example.com',
		role: 'user',
		photo: 'user-20.jpg',
		password: genericUserPassword,
		passwordConfirm: genericUserPassword
	}
];
