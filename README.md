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
  "lint:js:eslint": "eslint app --color --cache --config node_modules/@lintkit/eslint-config/eslint.config.mjs --cache-location .cache/ --cache-strategy content",
  "lint:js:eslint:fix": "npm run lint:js:eslint -- --fix",
}
```
