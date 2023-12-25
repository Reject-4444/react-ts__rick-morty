import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersType } from '../../types/types';

export interface CharInEpisodesType {
  charactersInEpisodes: CharactersType[];
}

const initialState: CharInEpisodesType = {
  charactersInEpisodes: [],
};

const charactersInEpisodesSlice = createSlice({
  name: 'GET',
  initialState,
  reducers: {
    setCharactersInEpisodes: (
      state,
      action: PayloadAction<CharactersType[]>
    ) => {
      state.charactersInEpisodes = action.payload;
    },
  },
});

export default charactersInEpisodesSlice.reducer;
export const {setCharactersInEpisodes} = charactersInEpisodesSlice.actions;