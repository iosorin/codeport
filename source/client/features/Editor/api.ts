import { debounce, ls } from '@/library/utils';
import { EditorSettingsType } from './constants';

const dbLs = debounce(ls, 250);
const title = process.env.TITLE;

export const api = {
    get value(): string {
        return ls(`${title}-editor-value`);
    },

    set value(value: string) {
        dbLs(`${title}-editor-value`, value);
    },

    get settings() {
        return ls(`${title}-editor-settings`);
    },

    set settings(settings: EditorSettingsType) {
        dbLs(`${title}-editor-settings`, settings, true);
    },
};
