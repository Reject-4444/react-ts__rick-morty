import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersType } from '../../types/types';

export interface StateCharactersType {
  characters: CharactersType[];
}

const initialState: StateCharactersType = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'GET',
  initialState,
  reducers: {
    getCharacters: (state, action: PayloadAction<CharactersType[]>) => {
      state.characters = state.characters.concat(action.payload);
    },
  },
});

export default charactersSlice.reducer;
export const { getCharacters } = charactersSlice.actions;
