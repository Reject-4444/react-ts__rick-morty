import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface loadMoreEpisodesType {
  quantityEpisodes: number;
  amountOfEpisodes: number;
  amountOfEpisodesPages: number;
}

const initialState: loadMoreEpisodesType = {
  quantityEpisodes: 12,
  amountOfEpisodes: 0,
  amountOfEpisodesPages: 0,
};

const loadMoreEpisodesSlice = createSlice({
  name: 'load',
  initialState,
  reducers: {
    loadMoreEpisodes: (state, action: PayloadAction<number>) => {
      if (state.quantityEpisodes < state.amountOfEpisodes) {
        state.quantityEpisodes += action.payload;
      }
    },

    setAmountOfEpisodes: (state, action: PayloadAction<number>) => {
      state.amountOfEpisodes = action.payload;
    },

    setAmountOfPagesEpisodes: (state, action: PayloadAction<number>) => {
      state.amountOfEpisodesPages = action.payload;
    },
  },
});

export default loadMoreEpisodesSlice.reducer;
export const { loadMoreEpisodes, setAmountOfPagesEpisodes, setAmountOfEpisodes } =
  loadMoreEpisodesSlice.actions;
