import { Link, useParams } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';
import axios from 'axios';
import { CHARACTERS_URL, EPISODES_URL } from '../../API/urls';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getCharacter } from '../../redux/features/singleCharacterSlice';
import { useEffect, useMemo, useState } from 'react';
import styles from './CharacterDetails.module.scss';
import { ButtonGoBack } from '../../components/UI/ButtonGoBack/ButtonGoBack';
import { ImageCharacterDetails } from '../../components/UI/ImageCharacterDetails/ImageCharacterDetails';
import { getEpisodes } from '../../redux/features/episodesSlice';
import { EpisodesType } from '../../types/types';
import { Loader } from '../../components/UI/Loader/Loader';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import { actions } from '../../redux/features/loadMoreEpisodesInCharacter';

export const CharacterDetails = () => {
  const { characterId } = useParams();
  const dispatch = useAppDispatch();
  const character = useAppSelector((state) => state.character.character);
  const fetchCharacter = useFetching(async () => {
    const response = await axios.get(CHARACTERS_URL + `/${characterId}`);
    dispatch(getCharacter(response.data));
  });
  const [quantityOfEpisodes, setQuantityOfEpisodes] = useState(4);

  const episodes = useAppSelector((state) => state.episodes.episodes);

  const setEpisodes = (episodes: EpisodesType[]) =>
    dispatch(getEpisodes(episodes));

  const fetchAllEpisodes = useFetching(async () => {
    const promises = [];
    for (let i = 1; i <= 3; i++) {
      promises.push(
        axios
          .get(EPISODES_URL + `?page=${i}`)
          .then((response) => response.data.results)
      );
    }
    const result = await Promise.all(promises);
    const response = result.flat();
    setEpisodes(response);
  });

  const filteredEpisodes = useMemo(() => {
    return characterId
      ? episodes.filter((episode) => {
          return episode.characters.some((characterUrl) =>
            characterUrl.endsWith(`/${characterId}`)
          );
        })
      : [];
  }, [characterId, episodes]);

  const amountOfEpisodesInCharacter = useAppSelector(
    (state) => state.loadMoreEpisodesInCharacter.amountOfEpisodesInCharacter
  );

  const isLoading = useAppSelector((state) => state.isLoadingError.isLoading);
  const isError = useAppSelector((state) => state.isLoadingError.isError);

  useEffect(() => {
    fetchCharacter();
    fetchAllEpisodes();
  }, [characterId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(actions.setAmountOfEpisodesInCharacter(filteredEpisodes.length));
  }, [filteredEpisodes.length]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles['character-details']}>
      <ButtonGoBack />
      {isLoading && !isError && <Loader />}
      {!isLoading && isError && <ErrorPage />}
      {!isLoading && !isError && (
        <>
          <ImageCharacterDetails source={character?.image} />
          <h3 className={styles['character-details__name']}>
            {character?.name}
          </h3>
          <div className={styles['character-details__titles']}>
            <h4 className={styles['character-details__title']}>Informations</h4>
            <h4 className={styles['character-details__title']}>Episodes</h4>
          </div>
          <div className={styles['character-details__wrapper']}>
            <div className={styles['character-details__informations']}>
              <div className={styles['character-details__informations-item']}>
                <h5
                  className={
                    styles['character-details__informations-item-title']
                  }
                >
                  Gender
                </h5>
                <p
                  className={
                    styles['character-details__informations-item-value']
                  }
                >
                  {character?.gender}
                </p>
              </div>
              <div className={styles['character-details__informations-item']}>
                <h5
                  className={
                    styles['character-details__informations-item-title']
                  }
                >
                  Status
                </h5>
                <p
                  className={
                    styles['character-details__informations-item-value']
                  }
                >
                  {character?.status}
                </p>
              </div>
              <div className={styles['character-details__informations-item']}>
                <h5
                  className={
                    styles['character-details__informations-item-title']
                  }
                >
                  Specie
                </h5>
                <p
                  className={
                    styles['character-details__informations-item-value']
                  }
                >
                  {character?.species}
                </p>
              </div>
              <div className={styles['character-details__informations-item']}>
                <h5
                  className={
                    styles['character-details__informations-item-title']
                  }
                >
                  Origin
                </h5>
                <p
                  className={
                    styles['character-details__informations-item-value']
                  }
                >
                  {character?.origin.name}
                </p>
              </div>
              <div className={styles['character-details__informations-item']}>
                <h5
                  className={
                    styles['character-details__informations-item-title']
                  }
                >
                  Type
                </h5>
                <p
                  className={
                    styles['character-details__informations-item-value']
                  }
                >
                  {character?.type}
                </p>
              </div>
              <div className={styles['character-details__informations-item']}>
                <h5
                  className={
                    styles['character-details__informations-item-title']
                  }
                >
                  Location
                </h5>
                <p
                  className={
                    styles['character-details__informations-item-value']
                  }
                >
                  {character?.location.name}
                </p>
              </div>
            </div>

            <div className={styles['character-details__episodes']}>
              {filteredEpisodes
                .slice(0, quantityOfEpisodes)
                .map((episode, index) => (
                  <Link
                    to={`/episodes/${episode.id}`}
                    key={`${episode.air_date}__${index}`}
                    className={styles['character-details__episodes-item']}
                  >
                    <h5 className={styles['character-details__episodes-title']}>
                      {episode.episode}
                    </h5>
                    <p className={styles['character-details__episodes-name']}>
                      {episode.name}
                    </p>
                    <p
                      className={styles['character-details__episodes-airdate']}
                    >
                      {episode.air_date}
                    </p>
                    <div
                      className={styles['character-details__episodes-arrow']}
                    />
                  </Link>
                ))}
              {quantityOfEpisodes < amountOfEpisodesInCharacter &&
                !isLoading && (
                  <button
                    className={styles['character-details__button']}
                    onClick={() => setQuantityOfEpisodes((prev) => (prev += 4))}
                  >
                    Load more...
                  </button>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
