import { debounce, ls } from '@/library/utils';
import { EditorSettings } from './constants';

const lsdb = debounce(ls, 300);
const title = process.env.TITLE;

export const api = {
    get value(): string {
        return ls(`${title}-editor-value`);
    },

    set value(value: string) {
        lsdb(`${title}-editor-value`, value);
    },

    get settings() {
        return ls(`${title}-editor-settings`);
    },

    set settings(settings: EditorSettings) {
        lsdb(`${title}-editor-settings`, settings, true);
    },
};
