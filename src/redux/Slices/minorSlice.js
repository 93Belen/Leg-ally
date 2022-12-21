import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'minor',
    initialState: {},
    reducers: {
        setState: (state, action) => {
            state = action.payload;
            return state;
        }
    }
}

const minorSlice = createSlice(options);
export const {setState} = minorSlice.actions;
export default minorSlice.reducer;