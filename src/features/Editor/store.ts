import { autorun, makeAutoObservable } from 'mobx';
import { SocketService } from '@/services';
import { DEFAULT_SETTINGS, DEFAULT_VALUE, EditorSettings } from './constants';
import { defineTheme } from './store.effect';

class EditorStore {
    roomID = '';

    socket = SocketService.getInstance();

    value = DEFAULT_VALUE;

    settings = DEFAULT_SETTINGS;

    settingsIsVisible = false;

    consoleIsVisible = false;

    constructor() {
        makeAutoObservable(this, { socket: false });

        autorun(() => {
            if (this.roomID) {
                this.bindEvents();
            }
        });
    }

    setValue = (newValue: string, fromOrigin = false) => {
        this.value = newValue;

        if (this.roomID && fromOrigin) {
            this.socket.emit('editor-value', this.value);
        }
    };

    setRoomID = (value: string) => {
        this.roomID = value;
    };

    toggleSettings = (show = !this.settingsIsVisible) => {
        this.settingsIsVisible = show;
    };

    toggleConsole = (show = !this.consoleIsVisible) => {
        this.consoleIsVisible = show;
    };

    _setSettings = (updated: EditorSettings) => {
        this.settings = { ...this.settings, ...updated };
    };

    setSettings = async (updated: EditorSettings = {}, fromOrigin = true) => {
        const { theme } = updated;

        if (theme) {
            await defineTheme(theme);
        }

        if (fromOrigin) {
            this.socket.emit('editor-settings', updated);
        }

        // eslint-disable-next-line no-underscore-dangle
        this._setSettings(updated);
    };

    bindEvents = () => {
        this.socket.on('client:user-joined', () => {
            this.socket.emit('editor-value', this.value);
            this.socket.emit('editor-settings', this.settings);
        });

        this.socket.on('client:editor-value', (newValue: string) => {
            this.setValue(newValue);
        });

        this.socket.on('client:editor-settings', (newSettings: EditorSettings) => {
            this.setSettings(newSettings, false);
        });
    };
}

const editorStore = new EditorStore();

export type IEditorStore = typeof editorStore;

export default editorStore;
