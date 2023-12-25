import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharactersType } from "../../types/types";

export interface CharacterInterface {
    character: CharactersType | null;
}

const initialState: CharacterInterface = {
    character: null,
};

const singleCharacterSlice = createSlice({
    name: 'GET',
    initialState,
    reducers: {
        getCharacter: (state, action: PayloadAction<CharactersType>) => {
            state.character = action.payload
        } ,
    }
});

export default singleCharacterSlice.reducer;
export const {getCharacter} = singleCharacterSlice.actions;