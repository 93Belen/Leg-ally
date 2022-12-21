import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'inputs',
    initialState: {},
    reducers: {
        setState: (state, action) => {
            state = action.payload;
            return state
        }
    }
}

const inputsSlice = createSlice(options);
export const {setState} = inputsSlice.actions;
export default inputsSlice.reducer;