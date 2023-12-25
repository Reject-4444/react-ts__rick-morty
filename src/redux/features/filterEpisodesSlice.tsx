import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterType {
  debouncedName: string;
  episodesName: string;
}

const initialState: FilterType = {
  debouncedName: '',
  episodesName: '',
};

const filterEpisodesSlice = createSlice({
  name: 'filterEpisodes',
  initialState,
  reducers: {
    filterByDebouncedName: (state, action: PayloadAction<string>) => {
      state.debouncedName = action.payload;
    },
    filterByName: (state, action: PayloadAction<string>) => {
      state.episodesName = action.payload;
    },
  },
});

export default filterEpisodesSlice.reducer;
export const { actions } = filterEpisodesSlice;