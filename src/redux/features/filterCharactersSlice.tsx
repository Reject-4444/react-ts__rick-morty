import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterType {
  debouncedName: string;
  name: string;
  species: string;
  gender: string;
  status: string;
}

const initialState: FilterType = {
  debouncedName: '',
  name: '',
  species: '',
  gender: '',
  status: '',
};

const filterCharactersSlice = createSlice({
  name: 'filterCharacters',
  initialState,
  reducers: {
    filterByDebouncedName: (state, action: PayloadAction<string>) => {
      state.debouncedName = action.payload;
    },
    filterByName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    filterBySpecies: (state, action: PayloadAction<string>) => {
      state.species = action.payload;
    },

    filterByGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },

    filterByStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export default filterCharactersSlice.reducer;
export const { actions } = filterCharactersSlice;
