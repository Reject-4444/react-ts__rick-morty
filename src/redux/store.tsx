import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./features/charactersSlice";
import loadMoreSlice from "./features/loadMoreCharactersSlice";
import filterCharactersSlice from "./features/filterCharactersSlice";
import isVisibleMenuSlice from "./features/isVisibleMenuSlice";
import loaderErrorSlice from "./features/loaderErrorSlice";
import singleCharacterSlice from "./features/singleCharacterSlice";
import episodesSlice from "./features/episodesSlice";
import sliderSlice from "./features/sliderSlice";
import filterEpisodesSlice from "./features/filterEpisodesSlice";
import loadMoreEpisodesSlice from "./features/loadMoreEpisodesSlice";
import singleEpisodeSlice from "./features/singleEpisodeSlice";
import charactersInEpisodesSlice from "./features/charactersInEpisodesSlice";
import loadMoreLocations from "./features/loadMoreLocationsSlice";
import locationsSlice from "./features/locationsSlice";
import filterLocationsSlice from "./features/filterLocationsSlice";
import charactersInLocationsSlice from "./features/charactersInLocationsSlice";
import singleLocationsSlice from "./features/singleLocationsSlice";

export const store = configureStore({
    reducer: {
        characters: charactersSlice,
        loadMore: loadMoreSlice,
        filterCharacters: filterCharactersSlice,
        filterEpisodes: filterEpisodesSlice,
        filterLocations: filterLocationsSlice,
        isVisibleMenu: isVisibleMenuSlice,
        isLoadingError: loaderErrorSlice,
        character: singleCharacterSlice,
        episodes: episodesSlice,
        slider: sliderSlice,
        loadMoreEpisodes: loadMoreEpisodesSlice,
        loadMoreLocations: loadMoreLocations,
        episode: singleEpisodeSlice,
        location: singleLocationsSlice,
        charactersInEpisodes: charactersInEpisodesSlice,
        charatersInLocations: charactersInLocationsSlice,
        locations: locationsSlice,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;