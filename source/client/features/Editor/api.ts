import { debounce, ls } from '@/library/utils';
import { EditorOptions } from '@/library/constants';

const write = debounce(ls, 250);
const title = process.env.TITLE;

export const api = {
	get value(): string {
		return ls(`${title}-editor-value`);
	},

	set value(value: string) {
		write(`${title}-editor-value`, value);
	},

	get settings() {
		return ls(`${title}-editor-settings`);
	},

	set settings(settings: EditorOptions) {
		write(`${title}-editor-settings`, settings, true);
	},
};
