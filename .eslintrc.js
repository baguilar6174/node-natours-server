module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'spaced-comment': 'error',
		quotes: ['error', 'single'],
		'no-duplicate-imports': 'error',
		'no-unused-vars': 'off'
	}
};
