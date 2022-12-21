import { createSlice } from "@reduxjs/toolkit";

const options = {
    name: 'homeState',
    initialState: {},
    reducers: {
        setState: (state, action) => {
            state = action.payload;
            return state
        }
    }
}

const homeStateSlice = createSlice(options);
export const {setState} = homeStateSlice.actions;
export default homeStateSlice.reducer;