export const createSlug = (input: string): string => {
	const slug = input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
	return slug;
};
