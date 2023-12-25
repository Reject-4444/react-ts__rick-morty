import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactersType } from '../../types/types';

export interface CharInLocationsType {
  charactersInLocations: CharactersType[];
}

const initialState: CharInLocationsType = {
  charactersInLocations: [],
};

const charactersInLocationsSlice = createSlice({
  name: 'GetCharactdrsInLocations',
  initialState,
  reducers: {
    setCharactersInLocations: (
      state,
      action: PayloadAction<CharactersType[]>
    ) => {
      state.charactersInLocations = action.payload;
    },
  },
});

export default charactersInLocationsSlice.reducer;
export const {setCharactersInLocations} = charactersInLocationsSlice.actions;