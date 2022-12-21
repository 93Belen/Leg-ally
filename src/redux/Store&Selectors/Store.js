import { configureStore } from "@reduxjs/toolkit";
import adultSlice from "../Slices/adultSlice";
import homeStateSlice from "../Slices/homeStateSlice";
import inputsSlice from "../Slices/inputsSlice";
import minorSlice from "../Slices/minorSlice";





const store = configureStore({
    reducer: {
        adult: adultSlice,
        minor: minorSlice,
        homeState: homeStateSlice,
        inputs: inputsSlice
    }
})
export default store;