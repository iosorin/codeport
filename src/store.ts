import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { editorReducer, editorSagas } from '@/features/Editor';
import { callReducer } from '@/features/Call';

const rootReducer = combineReducers({
    editor: editorReducer,
    call: callReducer,
});

function* rootSaga() {
    yield all([...editorSagas]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
    devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
