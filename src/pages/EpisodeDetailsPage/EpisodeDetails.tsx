import { useParams } from 'react-router-dom';
import { ButtonGoBack } from '../../components/UI/ButtonGoBack/ButtonGoBack';
import styles from './EpisodeDetails.module.scss';
import { useFetching } from '../../hooks/useFetching';
import axios from 'axios';
import { EPISODES_URL } from '../../API/urls';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getEpisode } from '../../redux/features/singleEpisodeSlice';
import { useEffect } from 'react';
import { setCharactersInEpisodes } from '../../redux/features/charactersInEpisodesSlice';
import { CharactersCard } from '../../components/UI/CharactersCard/CharactersCard';
import { Loader } from '../../components/UI/Loader/Loader';
import { ErrorPage } from '../ErrorPage/ErrorPage';

export const EpisodeDetails = () => {
  const { episodeId } = useParams();

  const dispatch = useAppDispatch();
  const episode = useAppSelector((state) => state.episode.episode);
  const charactersInEpisodes = useAppSelector(
    (state) => state.charactersInEpisodes.charactersInEpisodes
  );

  const fetchEpisode = useFetching(async () => {
    const response = await axios.get(EPISODES_URL + `/${episodeId}`);
    dispatch(getEpisode(response.data));

    const characterPromises = response.data.characters.map(
      (characterUrl: string) => axios.get(characterUrl)
    );

    const responseCharacters = await Promise.all(characterPromises);
    dispatch(
      setCharactersInEpisodes(
        responseCharacters.map((character) => character.data)
      )
    );
  });

  useEffect(() => {
    fetchEpisode();
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
          <h2 className={styles['episode-details__name']}>{episode?.name}</h2>
          <div className={styles['episode-details__information']}>
            <div className={styles['episode-details__information-item']}>
              <p
                className={styles['episode-details__information-item-title']}
              >
                Episode
              </p>
              <p
                className={styles['episode-details__information-item-value']}
              >
                {episode?.episode}
              </p>
            </div>
            <div className={styles['episode-details__information-item']}>
              <p
                className={styles['episode-details__information-item-title']}
              >
                Date
              </p>
              <p
                className={styles['episode-details__information-item-value']}
              >
                {episode?.air_date}
              </p>
            </div>
          </div>
          <h3 className={styles['episode-details__cast']}>Cast</h3>
          <div className={styles['episode-details__card-wrapper']}>
            <div className='container--card'>
              {charactersInEpisodes.map((character) => (
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
