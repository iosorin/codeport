import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setEditorSettings, setEditorTheme } from './reducer';
import { APP_THEME } from './defaults';

export function* updateEditorTheme(action: { type: string; payload: string }): SagaIterator {
    const theme = action.payload;

    try {
        if (theme !== APP_THEME) {
            yield call(() => import(`codemirror/theme/${theme}.css`));
        }

        yield put(setEditorSettings({ theme }));
    } catch (error) {
        console.log('error', error);
    }
}

export const editorSagas = [takeLatest(setEditorTheme.type, updateEditorTheme)];
