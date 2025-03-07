import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import gitignore from 'eslint-config-flat-gitignore';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';

export default {
	gitignore: gitignore(),

	global: {
		ignores: [
			'**/Configuration/**',
			'**/lib/**',
			'**/libs/**',
			'**/Resources/Public/**',
			'**/snapshots/**',
			'**/TypoScript/**',
		],
	},

	// Lint JSON files
	json: {
		files: [
			'*.json',
			'**/*.json',
		],
		ignores: [
			'package-lock.json',
		],
		language: 'json/json',
		...json.configs.recommended,
	},

	// Lint JSONC files
	jsonc: {
		files: [
			'*.jsonc',
			'**/*.jsonc',
		],
		language: 'json/jsonc',
		...json.configs.recommended,
	},

	// Lint JSON5 files
	json5: {
		files: [
			'*.json5',
			'**/*.json5',
		],
		language: 'json/json5',
		...json.configs.recommended,
	},

	markdown: {
		files: [
			'*.md',
			'**/*.md',
		],
		plugins: {
			markdown,
		},
		language: 'markdown/commonmark',
		rules: {
			'markdown/no-html': 'error',
		},
	},

	js: {
		...js.configs.recommended,
		...stylistic.configs.recommended,
		...eslintPluginUnicorn.configs.recommended,
		...playwright.configs['flat/recommended'],
		files: [
			'*.js',
			'**/*.js',
			'*.mjs',
			'**/*.mjs',
			'*.cjs',
			'**/*.cjs',
			'**/*.spec.cts',
			'**/*.spec.mts',
			'**/*.spec.ts',
			'**/*.test.cts',
			'**/*.test.mts',
			'**/*.test.ts',
			'**/*.unit.cts',
			'**/*.unit.mts',
			'**/*.unit.ts',
			'**/Fixtures/*.cts',
			'**/Fixtures/*.mts',
			'**/Fixtures/*.ts',
			'playwright.config.cts',
			'playwright.config.mts',
			'playwright.config.ts',
		],

		plugins: {
			'@stylistic': stylistic,
			'unicorn': eslintPluginUnicorn,
			playwright,
		},

		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...js.configs.recommended.globals,
				...eslintPluginUnicorn.configs.recommended.globals,

				...globals.browser,
				...globals.node,
				...globals.jquery,

				// Undefined vars (no-undef)
				es6: true,
				node: true,
				google: true,
			},
		},
		rules: {
			// ESLint
			...js.configs.recommended.rules,
			'capitalized-comments': [
				'error',
				'always',
				{
					ignorePattern: 'bearer',
					ignoreConsecutiveComments: true,
				},
			],
			'dot-notation': 'error',
			'eqeqeq': 'error',
			'no-bitwise': 'error',
			'no-mixed-spaces-and-tabs': ['error', false],
			'no-shadow': 'error',
			'object-shorthand': 'error',
			'one-var': ['error', 'consecutive'],
			'prefer-const': 'error',
			'prefer-object-has-own': 'error',
			'prefer-template': 'warn',
			'radix': ['error', 'as-needed'],

			...playwright.configs['flat/recommended'].rules,
			'playwright/no-conditional-in-test': 'off', // Disallow conditional logic in tests
			'playwright/no-conditional-expect': 'off', // Disallow conditional logic in tests
			'playwright/valid-title': [
				'error',
				{
					ignoreTypeOfTestName: true, // Allow variables as test names
				},
			],

			// Unicorn
			...eslintPluginUnicorn.configs.recommended.rules,
			'unicorn/prefer-global-this': 'warn',
			'unicorn/no-null': 'off',

			// Stylistic
			...stylistic.configs.recommended.rules,
			'@stylistic/brace-style': 'error',
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/no-tabs': [
				'error',
				{
					allowIndentationTabs: true,
				},
			],
			'@stylistic/operator-linebreak': ['error', 'after'],
			'@stylistic/semi': 'error',
			'@stylistic/space-before-function-paren': ['error', 'never'],
		},
	},
};
