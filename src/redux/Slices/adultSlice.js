import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'adult',
    initialState: {},
    reducers: {
        setState: (state, action) => {
            state = action.payload;
            return state
        }
    }
}

const adultSlice = createSlice(options);
export const {setState} = adultSlice.actions;
export default adultSlice.reducer;