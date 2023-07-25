declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			PORT: string;
			API_PREFIX: string;
			MONGO_URL: string;
			JWT_SECRET: string;
			JWT_EXPIRES_IN: string;
			EMAIL_USERNAME: string;
			EMAIL_PASSWORD: string;
			EMAIL_HOST: string;
			EMAIL_PORT: string;
		}
	}
}

export {};
