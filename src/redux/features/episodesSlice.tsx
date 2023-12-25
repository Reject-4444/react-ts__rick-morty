import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EpisodesType } from "../../types/types";

export interface EpisodesStateType {
    episodes: EpisodesType[];
}

const initialState: EpisodesStateType = {
    episodes: [],
}

export const episodesSlice = createSlice({
    name: 'episodes',
    initialState,
    reducers: {
        getEpisodes: (state, action: PayloadAction<EpisodesType[]>) => {
            state.episodes = action.payload;
        },
    }
});

export default episodesSlice.reducer;
export const {getEpisodes} = episodesSlice.actions;