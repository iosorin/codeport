import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ExtendedEditorConfig, DEFAULT_SETTINGS, DEFAULT_VALUE } from './defaults';

/* slice */
export const slice = createSlice({
    name: 'editor',
    initialState: {
        value: DEFAULT_VALUE,
        settings: DEFAULT_SETTINGS,
        settingsIsOpen: false,
    },
    reducers: {
        setEditorValue: (state, { payload }: PayloadAction<string>) => {
            state.value = payload;
        },
        setEditorSettings: (state, { payload }: PayloadAction<ExtendedEditorConfig>) => {
            state.settings = { ...state.settings, ...payload };
        },
        toggleEditorSettings: (state, { payload }: PayloadAction<boolean | undefined>) => {
            state.settingsIsOpen = typeof payload === 'undefined' ? !state.settingsIsOpen : payload;
        },
    },
});

/* actions */
export const { setEditorValue, setEditorSettings, toggleEditorSettings } = slice.actions;
export const setEditorTheme = createAction<string>('editor/setEditorTheme');

/* selector */
export const getEditorState = (state: RootState) => state.editor;

/* reducer */
export const { reducer: editorReducer } = slice;
