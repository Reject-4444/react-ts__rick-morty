import { useParams } from 'react-router-dom';
import styles from '../EpisodeDetailsPage/EpisodeDetails.module.scss';
import { ButtonGoBack } from '../../components/UI/ButtonGoBack/ButtonGoBack';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useFetching } from '../../hooks/useFetching';
import axios from 'axios';
import { LOCATIONS_URL } from '../../API/urls';
import { getLocation } from '../../redux/features/singleLocationsSlice';
import { setCharactersInLocations } from '../../redux/features/charactersInLocationsSlice';
import { useEffect } from 'react';
import { Loader } from '../../components/UI/Loader/Loader';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { CharactersCard } from '../../components/UI/CharactersCard/CharactersCard';

export const LocationsDetails = () => {
  const { locationId } = useParams();

  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.location.location);
  const charactersInLocations = useAppSelector(
    (state) => state.charatersInLocations.charactersInLocations
  );

  const fetchLocation = useFetching(async () => {
    const response = await axios.get(LOCATIONS_URL + `/${locationId}`);
    dispatch(getLocation(response.data));

    const residentsPromises = response.data.residents.map(
      (characterUrl: string) => axios.get(characterUrl)
    );

    const responseCharacters = await Promise.all(residentsPromises);
    dispatch(
      setCharactersInLocations(
        responseCharacters.map((character) => character.data)
      )
    );
  });

  useEffect(() => {
    fetchLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isLoading = useAppSelector((state) => state.isLoadingError.isLoading);
  const isError = useAppSelector((state) => state.isLoadingError.isError);

  return (
    <div className={styles['episode-details']}>
      <ButtonGoBack />
      {isLoading && !isError && <Loader />}
      {!isLoading && isError && <ErrorPage />}
      {!isLoading && !isError && (
        <>
          <h2 className={styles['episode-details__name']}>{location?.name}</h2>
          <div className={styles['episode-details__information']}>
            <div className={styles['episode-details__information-item']}>
              <p className={styles['episode-details__information-item-title']}>
                Type
              </p>
              <p className={styles['episode-details__information-item-value']}>
                {location?.type}
              </p>
            </div>
            <div className={styles['episode-details__information-item']}>
              <p className={styles['episode-details__information-item-title']}>
                Dimension
              </p>
              <p className={styles['episode-details__information-item-value']}>
                {location?.dimension}
              </p>
            </div>
          </div>
          <h3 className={styles['episode-details__cast']}>Residents</h3>
          <div className={styles['episode-details__card-wrapper']}>
            <div className='container--card'>
              {charactersInLocations.map((character) => (
                <CharactersCard
                  key={character.id}
                  character={character}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
