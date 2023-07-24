import { sign } from 'jsonwebtoken';

import EnvConfig from '../env.config';
import { CustomJwtPayload } from '../types/index';

export const signToken = (id: string) => {
	const payload: CustomJwtPayload = { id };
	return sign(payload, EnvConfig.JWT_SECRET, {
		expiresIn: EnvConfig.JWT_EXPIRES_IN
	});
};
