import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EpisodesType } from "../../types/types";

export interface EpisodeInterface {
    episode: EpisodesType | null;
}

const initialState: EpisodeInterface = {
    episode: null,
};

const singleEpisodeSlice = createSlice({
    name: 'GET',
    initialState,
    reducers: {
        getEpisode: (state, action: PayloadAction<EpisodesType>) => {
            state.episode = action.payload
        } ,
    }
});

export default singleEpisodeSlice.reducer;
export const {getEpisode} = singleEpisodeSlice.actions;