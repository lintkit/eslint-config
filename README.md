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
  "eslint:dry-run": "eslint app --color --cache --config node_modules/@lintkit/eslint-config/eslint.config.js --cache-location .cache/ --cache-strategy content",
  "eslint:fix": "npm run eslint:dry-run -- --fix",
}
```

## Local Override

If you need to override some of the config (but keep LintKit defaults), place a file in the root of your project `eslint.config.js` (or `eslint.config.mjs` if required)

Update the `script` to use your local `eslint.config.js` file instead of the LintKit one.

You can then include the LintKit config and add customisations where required.

```js
import config from '@lintkit/eslint-config/config.js';

config.js.ignores: [
	...config.js.ignores,
	'**/.Build/**',
]

export default Object.values(config);
```

## Upgrading to v2

- Any references to `node_modules/@lintkit/eslint-config/eslint.config.mjs` should be corrected to `node_modules/@lintkit/eslint-config/eslint.config.js`
