export const parseQuery = (query: object) => {
	let queryStr = JSON.stringify(query);
	queryStr = queryStr.replace(/\b(gte|get|let|lt)\b/g, (match): string => `$${match}`);
	return JSON.parse(queryStr);
};
