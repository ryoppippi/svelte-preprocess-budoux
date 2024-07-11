# svelte-preprocess-budoux

![Screenshot 2024-07-11 at 11 39 44](https://github.com/ryoppippi/svelte-preprocess-budoux/assets/1560508/03fd68d9-58fc-445b-8186-a42f22114ae2)


## Configuration

You can choose svelte prerocessor or sveltekit hooks

### Preprocessor 
`svelte.config.js`

```js
import { budouxPreprocess } from "svelte-preprocess-budoux";

const config = {
  preprocess: [
    vitePreprocess(),
    budouxPreprocess({ language: "ja" }),
  ],
  // ... other svelte options
};

export default config;
```

### Sveltekit hooks

`hooks.server.js`

```js
import { budouxHandle } from "svelte-preprocess-budoux";

export const handle = budouxHandle({ language: "ja" });
```
