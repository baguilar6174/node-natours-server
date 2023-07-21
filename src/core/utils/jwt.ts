import jwt from 'jsonwebtoken';
import EnvConfig from '../env.config';

export const signToken = (id: string) => {
	return jwt.sign({ id }, EnvConfig.JWT_SECRET, {
		expiresIn: EnvConfig.JWT_EXPIRES_IN
	});
};
