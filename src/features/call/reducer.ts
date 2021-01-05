import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

/* slice */
export const slice = createSlice({
    name: 'call',
    initialState: {
        callPannelIsOpen: false,
    },
    reducers: {
        toggleCallPannel: (state, { payload }: PayloadAction<boolean | undefined>) => {
            state.callPannelIsOpen =
                typeof payload === 'undefined' ? !state.callPannelIsOpen : payload;
        },
    },
});

/* actions */
export const { toggleCallPannel } = slice.actions;

/* selector */
export const getCallState = (state: RootState) => state.call;
export const callIsActive = (state: RootState) => state.call.callPannelIsOpen;

/* reducer */
export const { reducer: callReducer } = slice;
