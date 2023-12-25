import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationsType } from "../../types/types";

export interface LocationsStateType {
    locations: LocationsType[];
}

const initialState: LocationsStateType = {
    locations: [],
}

export const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        getLocations: (state, action: PayloadAction<LocationsType[]>) => {
            state.locations = action.payload;
        },
    }
});

export default locationsSlice.reducer;
export const {getLocations} = locationsSlice.actions;