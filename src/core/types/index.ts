import { SortOrder } from 'mongoose';

export interface RequestQuery {
	page: string;
	sort: string | SortType;
	limit: string;
	fields: string;
}

export type SortType = {
	[key: string]: SortOrder;
};
