import { autorun, makeAutoObservable } from 'mobx';
import { SocketService } from '@services';
import { DEFAULT_SETTINGS, DEFAULT_VALUE, ExtendedEditorConfig, CODEPORT_THEME } from './constants';

class EditorStore {
    roomID = '';

    socket = SocketService.getInstance();

    value = DEFAULT_VALUE;

    settings = DEFAULT_SETTINGS;

    settingsIsOpen = false;

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

    toggleSettings = (show = !this.settingsIsOpen) => {
        this.settingsIsOpen = show;
    };

    _setSettings = (updated: ExtendedEditorConfig) => {
        this.settings = { ...this.settings, ...updated };
    };

    setSettings = async (updated: ExtendedEditorConfig = {}, fromOrigin = true) => {
        const { theme } = updated;

        if (theme && theme !== CODEPORT_THEME) {
            await import(`codemirror/theme/${theme}.css`);
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

        this.socket.on('client:editor-settings', (newSettings: ExtendedEditorConfig) => {
            this.setSettings(newSettings, false);
        });
    };
}

export default new EditorStore();
