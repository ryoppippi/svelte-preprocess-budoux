# svelte-preprocess-budoux

[![npm version](https://img.shields.io/npm/v/svelte-preprocess-budoux?color=yellow)](https://npmjs.com/package/svelte-preprocess-budoux)
[![npm downloads](https://img.shields.io/npm/dm/svelte-preprocess-budoux?color=yellow)](https://npmjs.com/package/svelte-preprocess-budoux)

[![JSR](https://jsr.io/badges/@ryoppippi/svelte-preprocess-budoux)](https://jsr.io/@ryoppippi/svelte-preprocess-budoux)
[![JSR](https://jsr.io/badges/@ryoppippi/svelte-preprocess-budoux/score)](https://jsr.io/@ryoppippi/svelte-preprocess-budoux)

![Screenshot 2024-07-11 at 11 39 44](https://github.com/ryoppippi/svelte-preprocess-budoux/assets/1560508/03fd68d9-58fc-445b-8186-a42f22114ae2)

## Installation

```bash
npm install -D svelte-preprocess-budoux budoux

# or

npx jsr install -D @ryoppippi/svelte-preprocess-budoux
```

## Configuration

You can choose svelte prerocessor or sveltekit hooks

### Preprocessor

`svelte.config.js`

```js
import { budouxPreprocess } from 'svelte-preprocess-budoux';

const config = {
	preprocess: [
		vitePreprocess(),
		budouxPreprocess({ language: 'ja' }),
	],
	// ... other svelte options
};

export default config;
```

### SvelteKit hooks

`hooks.server.js`

```js
import { budouxHandle } from 'svelte-preprocess-budoux';

export const handle = budouxHandle({ language: 'ja' });
```
