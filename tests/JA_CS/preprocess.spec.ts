import fs from 'node:fs/promises';
import path from 'node:path';
import { preprocess } from 'svelte/compiler';
import { expect, it } from 'vitest';
import { budouxPreprocess } from '../../src/preprocessor.js';

it('japanese and simplified chinese', async () => {
	const id = path.resolve(import.meta.dirname, './Input.svelte');
	const source = await fs.readFile(id, 'utf-8');

	const { code } = await preprocess(
		source,
		[budouxPreprocess({ language: 'ja' })],
		{ filename: id },
	);

	await expect(code).toMatchFileSnapshot('./Output.svelte');
});
