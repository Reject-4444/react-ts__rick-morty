import axios from 'axios';
import { EPISODES_URL } from '../../API/urls';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useFetching } from '../../hooks/useFetching';
import { EpisodesType } from '../../types/types';
import { getEpisodes } from '../../redux/features/episodesSlice';
import { actions } from '../../redux/features/filterEpisodesSlice';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import styles from './Episodes.module.scss';
import { EpisodesCard } from '../../components/UI/EpisodesCard/EpisodesCard';
import {
  setAmountOfEpisodes,
  setAmountOfPagesEpisodes,
} from '../../redux/features/loadMoreEpisodesSlice';
import { Button } from '../../components/UI/ButtonLoadMore/Button';
import { Loader } from '../../components/UI/Loader/Loader';
import { ErrorPage } from '../ErrorPage/ErrorPage';

export const Episodes = () => {
  const episodes = useAppSelector((state) => state.episodes.episodes);
  const episodesName = useAppSelector(
    (state) => state.filterEpisodes.episodesName
  );
  const debouncedFilterValue = useAppSelector(
    (state) => state.filterEpisodes.debouncedName
  );
  const dispatch = useAppDispatch();
  const handleEpisodesName = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.filterByName(e.target.value));

  const setEpisodes = (episodes: EpisodesType[]) =>
    dispatch(getEpisodes(episodes));

  const filterEpisodes = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.filterByDebouncedName(e.target.value));
  };

  const debouncedFilterByName = useCallback( // eslint-disable-line react-hooks/exhaustive-deps
    
    debounce((e: ChangeEvent<HTMLInputElement>) => filterEpisodes(e), 1000),
    []
  );

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleEpisodesName(e);
    debouncedFilterByName(e);
  };

  const fetchAllEpisodes = useFetching(async () => {
    const promises = [];
    for (let i = 1; i <= quantityPages; i++) {
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

  const amountOfEpisodesFromServer = useAppSelector(
    (state) => state.loadMoreEpisodes.amountOfEpisodes
  );
  const quantityEpisodes = useAppSelector(
    (state) => state.loadMoreEpisodes.quantityEpisodes
  );
  const quantityPages = useAppSelector(
    (state) => state.loadMoreEpisodes.amountOfEpisodesPages
  );

  const fetchCountOfEpisodesPages = async () => {
    const response = await axios.get(EPISODES_URL);
    dispatch(setAmountOfEpisodes(response.data.info.count));
    dispatch(setAmountOfPagesEpisodes(response.data.info.pages));
  };

  const isLoadingEpisodes = useAppSelector(
    (state) => state.isLoadingError.isLoading
  );
  const isErrorEpisodes = useAppSelector(
    (state) => state.isLoadingError.isError
  );

  useEffect(() => {
    fetchAllEpisodes();
    fetchCountOfEpisodesPages();
  }, [quantityPages]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredEpisodes = useMemo(() => {
    return !!episodesName
      ? episodes.filter(
          (episode) =>
            episode.name
              .toLowerCase()
              .includes(debouncedFilterValue.toLowerCase()) ||
            episode.episode
              .toLowerCase()
              .includes(debouncedFilterValue.toLowerCase())
        )
      : episodes;
  }, [episodes, debouncedFilterValue]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isErrorEpisodes && !isLoadingEpisodes && <ErrorPage />}
      {!isLoadingEpisodes && !isErrorEpisodes && (
        <div className='section-wrapper'>
          <div className={styles['top-picture']} />
          <input
            placeholder='Filter by name or episode (ex. S01 or S01E02)'
            className={styles['episodes-wrapper__input']}
            type='text'
            value={episodesName}
            onChange={handleNameChange}
          />
          <div className='container--card'>
            {filteredEpisodes.slice(0, quantityEpisodes).map((episode) => (
              <EpisodesCard
                key={episode.id}
                epis={episode}
              />
            ))}
          </div>

          {quantityEpisodes < amountOfEpisodesFromServer &&
            !isLoadingEpisodes && (
              <Button
                variant='3'
                quantity={12}
              >
                Load more
              </Button>
            )}
        </div>
      )}
      {isLoadingEpisodes && !isErrorEpisodes && <Loader />}
    </>
  );
};
