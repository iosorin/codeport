import { autorun, makeAutoObservable } from 'mobx';
import { SocketService } from '@services';
import { EDITOR_OPTIONS, EditorOptions } from '@/library/constants';
import { CodeSnippet } from 'types';
import { createStore } from '@/core';
import { EDITOR_FONT_SIZE, EDITOR_THEME, EDITOR_VALUE } from './constants';
import { api } from './api';

class EditorStore {
    socket = SocketService.getInstance();

    roomID = '';

    value = EDITOR_VALUE;

    settings: EditorOptions = {
        ...EDITOR_OPTIONS,
        theme: EDITOR_THEME,
        fontSize: EDITOR_FONT_SIZE,
    };

    settingsVisible = false;

    consoleVisible = false;

    constructor(core) {
        console.log('args', core);

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

    setRoomID = (value: string) => {
        this.roomID = value;
    };

    setValue = (value: string, fromOrigin = false) => {
        this.value = value;

        if (fromOrigin) {
            api.value = value;

            if (this.roomID) {
                this.socket.emit('editor-value', value);
            }
        }
    };

    toggleSettings = (visible = !this.settingsVisible) => {
        this.settingsVisible = visible;
    };

    toggleConsole = (visible = !this.consoleVisible) => {
        this.consoleVisible = visible;
    };

    _setSettings = (settings: EditorOptions) => {
        this.settings = { ...this.settings, ...settings };
    };

    setSettings = async (settings: EditorOptions = {}, fromOrigin = true) => {
        const { theme } = settings;

        if (theme && !['default', 'codeport'].includes(theme)) {
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

        this.socket.on('client:editor-settings', (newSettings: EditorOptions) => {
            this.setSettings(newSettings, false);
        });
    };

    saveSnippet = (content: string) => {
        const snippet: CodeSnippet = {
            id: Date.now().toString(),
            content,
            lang: this.settings.mode,
        };

        api.saveSnippet(snippet);
        // .then(() => {
        //     this.ui?.toast.success('Snippet saved');
        // })
        // .catch((err) => {
        //     this.ui?.toast.error(err.message);
        // });
    };
}

export default createStore(EditorStore);
