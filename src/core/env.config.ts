import dotenv from 'dotenv';

import { DEFAULT_API_PREFIX, DEFAULT_PORT } from './constants';

// Config Values
dotenv.config();

interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	API_PREFIX: string | undefined;
	MONGO_URL: string | undefined;
	JWT_SECRET: string | undefined;
	JWT_EXPIRES_IN: string | undefined;
	EMAIL_USERNAME: string | undefined;
	EMAIL_PASSWORD: string | undefined;
	EMAIL_HOST: string | undefined;
	EMAIL_PORT: number | undefined;
}

interface Config {
	NODE_ENV: string;
	PORT: number;
	API_PREFIX: string;
	MONGO_URL: string;
	JWT_SECRET: string;
	JWT_EXPIRES_IN: string;
	EMAIL_USERNAME: string;
	EMAIL_PASSWORD: string;
	EMAIL_HOST: string;
	EMAIL_PORT: number;
}

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT ? Number(process.env.PORT) : DEFAULT_PORT,
		API_PREFIX: process.env.API_PREFIX ? process.env.API_PREFIX : DEFAULT_API_PREFIX,
		MONGO_URL: process.env.MONGO_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
		EMAIL_USERNAME: process.env.EMAIL_USERNAME,
		EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
		EMAIL_HOST: process.env.EMAIL_HOST,
		EMAIL_PORT: Number(process.env.EMAIL_PORT)
	};
};

const getSanitzedConfig = (config: ENV): Config => {
	for (const [key, value] of Object.entries(config)) {
		if (value === undefined) throw new Error(`Missing key ${key} in .env`);
	}
	return config as Config;
};

const config = getConfig();

const EnvConfig = getSanitzedConfig(config);

export default EnvConfig;
