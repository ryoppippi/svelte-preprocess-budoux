# svelte-preprocess-budoux

## Configuration

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
