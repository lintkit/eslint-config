import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright'
import gitignore from 'eslint-config-flat-gitignore'
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default {
	'gitignore': gitignore(),

	'global': {
		ignores: [
			'**/lib/**',
			'**/libs/**',
			'**/Resources/Public/**',
			'**/snapshots/**',
			'**/TypoScript/**',
			'**/Configuration/**'
		]
	},

	// lint JSON files
	'json': {
		files: ['*.json', '**/*.json'],
		ignores: ['package-lock.json'],
		language: 'json/json',
		...json.configs.recommended,
	},

	// lint JSONC files
	'jsonc': {
		files: ['*.jsonc', '**/*.jsonc'],
		language: 'json/jsonc',
		...json.configs.recommended,
	},

	// lint JSON5 files
	'json5': {
		files: ['*.json5', '**/*.json5'],
		language: 'json/json5',
		...json.configs.recommended,
	},

	'markdown': {
		files: ['*.md', '**/*.md'],
		plugins: {
			markdown
		},
		language: 'markdown/commonmark',
		rules: {
			'markdown/no-html': 'error'
		}
	},

	'playwright': {
		...playwright.configs['flat/recommended'],
		files: [
			'playwright.config.ts',
			'**/*.unit.ts',
			'**/*.spec.ts',
			'**/*.test.ts',
			'**/Fixtures/*.ts',
		],
		rules: {
			...playwright.configs['flat/recommended'].rules,
			'playwright/no-conditional-in-test': 'off', // Disallow conditional logic in tests
			'playwright/no-conditional-expect': 'off', // Disallow conditional logic in tests
			'playwright/valid-title': [
				'error',
				{
					'ignoreTypeOfTestName': true // Allow variables as test names
				}
			]
		},
	},

	'unicorn': {
		...eslintPluginUnicorn.configs.recommended,
		files: [
			'*.js',
			'**/*.js',
			'*.ts',
			'**/*.ts'
		],
		rules: {
			...eslintPluginUnicorn.configs.recommended.rules,
			'unicorn/prefer-global-this': 'warn'
		}
	},

	'js': {
		...js.configs.recommended,
		files: [
			'*.js',
			'**/*.js',
			'*.ts',
			'**/*.ts'
		],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...js.configs.recommended.globals,
				...globals.browser,
				...globals.node,
				...globals.jquery,

				// Undefined vars (no-undef)
				'es6': true,
				'node': true,
				'google': true
			},
		},
		rules: {
			...js.configs.recommended.rules,
			'one-var': ['error', 'consecutive'],
			'capitalized-comments': [
				"error",
				"always",
				{
					"ignorePattern": "bearer",
					"ignoreConsecutiveComments": true
				}
			],
			'prefer-template': 'warn',
			'prefer-const': 'error',
			'no-shadow': 'error',
			'no-bitwise': 'error',
			'eqeqeq': 'error',
			'dot-notation': 'error',
			'prefer-object-has-own': 'error',
			'object-shorthand': 'error',
			'radix': ['error', 'as-needed']
		}
	}
};
