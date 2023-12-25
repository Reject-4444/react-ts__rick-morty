import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterLocationsType {
  debouncedName: string;
  name: string;
  type: string;
  dimension: string;
}

const initialState: FilterLocationsType = {
  debouncedName: '',
  name: '',
  type: '',
  dimension: '',
};

const filterLocationsSlice = createSlice({
  name: 'filterLocations',
  initialState,
  reducers: {
    filterByDebouncedName: (state, action: PayloadAction<string>) => {
      state.debouncedName = action.payload;
    },
    filterByName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    filterByType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },

    filterByDimension: (state, action: PayloadAction<string>) => {
      state.dimension = action.payload;
    },
  },
});

export default filterLocationsSlice.reducer;
export const { actions } = filterLocationsSlice;
