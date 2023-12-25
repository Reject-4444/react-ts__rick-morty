import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface loadMoreCharactersType {
  quantityCharacters: number;
  amountOfCharacters: number;
  amountOfPages: number;
}

const initialState: loadMoreCharactersType = {
  quantityCharacters: 8,
  amountOfCharacters: 0,
  amountOfPages: 0,
};

const loadMoreSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    loadMoreCharacters: (state, action: PayloadAction<number>) => {
      if (state.quantityCharacters < state.amountOfCharacters) {
        state.quantityCharacters += action.payload;
      }
    },

    setAmountOfCharacters: (state, action: PayloadAction<number>) => {
      state.amountOfCharacters = action.payload;
    },

    setAmountOfPages: (state, action: PayloadAction<number>) => {
      state.amountOfPages = action.payload
    }
  },
});

export default loadMoreSlice.reducer;
export const { loadMoreCharacters, setAmountOfPages, setAmountOfCharacters } = loadMoreSlice.actions;
