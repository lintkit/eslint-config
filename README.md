# LintKit: ESLint Config

## Installation

Install the dependency

```
npm i --dev @lintkit/eslint-config --save
```

Add the cache file to your `.gitignore`

```
# Linting
.cache
```

Add the scripts to your `package.json`

```json
"scripts": {
  "eslint:dry-run": "eslint app --color --cache --config node_modules/@lintkit/eslint-config/eslint.config.mjs --cache-location .cache/ --cache-strategy content",
  "eslint:fix": "npm run eslint:dry-run -- --fix",
}
```

## Local Override

If you need to override some of the config (but keep LintKit defaults), place a file in the root of your project (`eslint.config.mjs`)

Update the `script` to use `eslint.config.mjs` instead of the LintKit one.

You can then include the LintKit config and add cusomtisations where required.

```js
import config from '@lintkit/eslint-config/config.js';

config.js.ignores: [
	...config.js.ignores,
	'**/.Build/**',
]

export default Object.values(config);
```