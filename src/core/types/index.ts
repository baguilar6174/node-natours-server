import { SortOrder } from 'mongoose';
import { HttpCode } from '../constants';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestQuery {
	sort: string | SortType;
	page: string;
	limit: string;
	fields: string;
}

export type SortType = {
	[key: string]: SortOrder;
};

export type PaginationType = {
	page: string;
	limit: string;
};

export type ApiFeatures = {
	query?: object;
	sort?: string | SortType;
	fields?: string;
	pagination?: PaginationType;
};

export interface AppErrorArgs {
	name?: string;
	statusCode: HttpCode;
	message: string;
	isOperational?: boolean;
}

export interface CustomJwtPayload extends JwtPayload {
	id: string;
}
