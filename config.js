import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright'
import gitignore from 'eslint-config-flat-gitignore'
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import stylistic from '@stylistic/eslint-plugin';

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
		plugins: {
			...js.configs.recommended.plugins,
			'@stylistic': stylistic
		},
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
			'@stylistic/indent': ['error', 'tab'],
			'capitalized-comments': [
				'error',
				'always',
				{
					'ignorePattern': 'bearer',
					'ignoreConsecutiveComments': true
				}
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
		}
	}
};
