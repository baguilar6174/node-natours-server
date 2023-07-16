import { SortOrder } from 'mongoose';

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
