import { createSlice } from "@reduxjs/toolkit";

const isVisibleMenuSlice = createSlice({
    name: 'visible',
    initialState: false,
    reducers: {
        doVisibleMenu: (state) => state = true,
        doInvisibleMenu: (state) => state = false, 
    }
})

export default isVisibleMenuSlice.reducer;
export const {doVisibleMenu, doInvisibleMenu} = isVisibleMenuSlice.actions;