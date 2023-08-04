/* eslint-disable no-magic-numbers */
export * from './routes';

export const ZERO = 0 as const;
export const ONE = 1 as const;
export const FIVE = 5 as const;
export const SEVEN = 7 as const;
export const TEN = 10 as const;
export const FORTY = 40 as const;
export const SIXTY = 60 as const;
export const ONE_HUNDRED = 100 as const;
export const ONE_THOUSAND = 1000 as const;

export const EARTH_RADIOUS = {
	MI: 3963.2,
	KM: 6371.1
} as const;

export const EMPTY_STRING = ' ' as const;
export const DEFAULT_PORT = 3000 as const;
export const DEFAULT_API_PREFIX = '/api/v1' as const;
export const DEV_ENVIRONMENT = 'development' as const;
export const PROD_ENVIRONMENT = 'production' as const;
export const PASSWORD_SALT = 12 as const;
export const RESET_TOKEN_SIZE = 32 as const;

export enum HttpCode {
	OK = 200,
	CREATED = 201,
	NO_CONTENT = 204,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}

export enum MongoErrors {
	CAST_ERROR = 'CastError',
	DUPLICATED_CODE = 11000,
	VALIDATION_ERROR = 'ValidationError'
}

export enum JWTErrors {
	JWT_ERROR = 'JsonWebTokenError',
	TOKEN_EXPIRED = 'TokenExpiredError'
}

export enum Entities {
	TOUR = 'Tour',
	USER = 'User',
	REVIEW = 'Review'
}

export enum Roles {
	ADMIN = 'admin',
	USER = 'user',
	GUIDE = 'guide',
	LEAD_GUIDE = 'lead-guide'
}
