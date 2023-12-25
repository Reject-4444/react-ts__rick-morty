import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationsType } from "../../types/types";

export interface LocationInterface {
    location: LocationsType | null;
}

const initialState: LocationInterface = {
    location: null,
};

const singleLocationSlice = createSlice({
    name: 'GETLOCATION',
    initialState,
    reducers: {
        getLocation: (state, action: PayloadAction<LocationsType>) => {
            state.location = action.payload
        } ,
    }
});

export default singleLocationSlice.reducer;
export const {getLocation} = singleLocationSlice.actions;