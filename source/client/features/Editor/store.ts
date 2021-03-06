import { autorun, makeAutoObservable } from 'mobx';
import { SocketService } from '@services';
import { DEFAULT_SETTINGS, DEFAULT_VALUE, CODEPORT_THEME, EditorSettingsType } from './constants';
import { api } from './api';

class EditorStore {
    roomID = '';

    socket = SocketService.getInstance();

    value = DEFAULT_VALUE;

    settings = DEFAULT_SETTINGS;

    settingsVisible = false;

    consoleVisible = false;

    constructor() {
        makeAutoObservable(this, { socket: false });

        autorun(() => {
            if (this.roomID) {
                this.bindEvents();
            }
        });

        this.init();
    }

    init() {
        const { value, settings } = api;

        if (value) {
            this.setValue(value, false);
        }

        if (settings) {
            this.setSettings(settings, false);
        }
    }

    setValue = (value: string, fromOrigin = false) => {
        this.value = value;

        if (fromOrigin) {
            api.value = value;

            if (this.roomID) {
                this.socket.emit('editor-value', value);
            }
        }
    };

    setRoomID = (value: string) => {
        this.roomID = value;
    };

    toggleSettings = (visible = !this.settingsVisible) => {
        this.settingsVisible = visible;
    };

    toggleConsole = (visible = !this.consoleVisible) => {
        this.consoleVisible = visible;
    };

    _setSettings = (settings: EditorSettingsType) => {
        this.settings = { ...this.settings, ...settings };
    };

    setSettings = async (settings: EditorSettingsType = {}, fromOrigin = true) => {
        const { theme } = settings;

        if (theme && theme !== CODEPORT_THEME) {
            await import(`codemirror/theme/${theme}.css`);
        }

        if (fromOrigin) {
            this.socket.emit('editor-settings', settings);

            api.settings = settings;
        }

        this._setSettings(settings);
    };

    bindEvents = () => {
        this.socket.on('client:user-joined', () => {
            this.socket.emit('editor-value', this.value);
            this.socket.emit('editor-settings', this.settings);
        });

        this.socket.on('client:editor-value', (newValue: string) => {
            this.setValue(newValue);
        });

        this.socket.on('client:editor-settings', (newSettings: EditorSettingsType) => {
            this.setSettings(newSettings, false);
        });
    };
}

export default new EditorStore();
