import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const sliderSlice = createSlice({
    name: 'slider',
    initialState,
    reducers: {
        setSlider: (state, action: PayloadAction<number>) => state = action.payload,
    }
});

export default sliderSlice.reducer;
export const {setSlider} = sliderSlice.actions;