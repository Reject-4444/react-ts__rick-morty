import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface loadMoreLocationsType {
  quantityLocations: number;
  amountOfLocations: number;
  amountOfLocationsPages: number;
}

const initialState: loadMoreLocationsType = {
  quantityLocations: 12,
  amountOfLocations: 0,
  amountOfLocationsPages: 0,
};

const loadMoreLocationsSlice = createSlice({
  name: 'loadLocations',
  initialState,
  reducers: {
    loadMoreLocations: (state, action: PayloadAction<number>) => {
      if (state.quantityLocations < state.amountOfLocations) {
        state.quantityLocations += action.payload;
      }
    },

    setAmountOfLocations: (state, action: PayloadAction<number>) => {
      state.amountOfLocations = action.payload;
    },

    setAmountOfPagesLocations: (state, action: PayloadAction<number>) => {
      state.amountOfLocationsPages = action.payload;
    },
  },
});

export default loadMoreLocationsSlice.reducer;
export const { loadMoreLocations, setAmountOfPagesLocations, setAmountOfLocations } =
  loadMoreLocationsSlice.actions;
