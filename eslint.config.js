import { ryoppippi } from '@ryoppippi/eslint-config';

export default ryoppippi({
	tailwind: false,
	svelte: true,
	ignores: ['examples/**'],
	typescript: {
		tsconfigPath: './tsconfig.json',
	},
});
