import { sign } from 'jsonwebtoken';

import { CustomJwtPayload } from '../types/index';
import EnvConfig from '../config/env.config';

export const signToken = (id: string) => {
	const payload: CustomJwtPayload = { id };
	return sign(payload, EnvConfig.JWT_SECRET, {
		expiresIn: EnvConfig.JWT_EXPIRES_IN
	});
};
