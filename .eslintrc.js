module.exports = {
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
	plugins: ['@typescript-eslint', 'prettier'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	rules: {
		'prettier/prettier': [
			'error',
			{
				trailingComma: 'none',
				tabWidth: 4,
				useTabs: true,
				semi: false,
				printWidth: 180,
				singleQuote: true,
				bracketSpacing: false,
				arrowParens: 'avoid'
			}
		],
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off'
	},
	env: {
		browser: true,
		node: true,
		es6: true
	}
}
