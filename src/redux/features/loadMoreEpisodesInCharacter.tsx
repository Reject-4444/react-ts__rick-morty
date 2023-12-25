import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface loadMoreEpisodesInCharacterType {
  amountOfEpisodesInCharacter: number;
}

const initialState: loadMoreEpisodesInCharacterType = {
  amountOfEpisodesInCharacter: 0,
};

const loadMoreEpisodesInCharacter = createSlice({
  name: 'loadMoreEpisodesInCharacter',
  initialState,
  reducers: {
    setAmountOfEpisodesInCharacter: (state, action: PayloadAction<number>) => {
      state.amountOfEpisodesInCharacter = action.payload;
    },
  },
});

export default loadMoreEpisodesInCharacter.reducer;
export const { actions } = loadMoreEpisodesInCharacter;
