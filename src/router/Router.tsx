import { Route, Routes, HashRouter } from 'react-router-dom';
import { Layout } from './Layout';
import { Characters } from '../pages/CharactersPage/Characters';
import { CharacterDetails } from '../pages/CharacterDetailsPage/CharacterDetails';
import { HomePage } from '../pages/HomePage/HomePage';
import { Episodes } from '../pages/EpisodesPage/Episodes';
import { EpisodeDetails } from '../pages/EpisodeDetailsPage/EpisodeDetails';
import { Locations } from '../pages/LocarionsPage/Locations';
import { LocationsDetails } from '../pages/LocationsDetailsPage/LocationsDetails';

export const Router = () => {
  return (
    <HashRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='characters' element={<Characters />} />
                <Route path="characters/:characterId" element={<CharacterDetails />} />
                <Route path="locations" element={<Locations />} />
                <Route path='locations/:locationId' element={<LocationsDetails />} />
                <Route path='episodes' element={<Episodes />} />
                <Route path='episodes/:episodeId' element={<EpisodeDetails />} />
            </Route>
        </Routes>
    </HashRouter>
  );
};
