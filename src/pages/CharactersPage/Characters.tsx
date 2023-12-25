import { Button } from '../../components/UI/ButtonLoadMore/Button';
import { Filter } from '../../components/UI/FilterCharacters/FilterCharacters';
import styles from './Characters.module.scss';
import { useFetching } from '../../hooks/useFetching';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getCharacters } from '../../redux/features/charactersSlice';
import { CharactersCard } from '../../components/UI/CharactersCard/CharactersCard';
import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { Loader } from '../../components/UI/Loader/Loader';
import { ErrorPage } from '../ErrorPage/ErrorPage';
import {
  setAmountOfCharacters,
  setAmountOfPages,
} from '../../redux/features/loadMoreCharactersSlice';
import { CHARACTERS_URL } from '../../API/urls';

export const Characters = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector((state) => state.characters.characters);
  const amountOfCharactersFromServer = useAppSelector(
    (state) => state.loadMore.amountOfCharacters
  );
  const quantityCharacters = useAppSelector(
    (state) => state.loadMore.quantityCharacters
  );
  const quantityPages = useAppSelector((state) => state.loadMore.amountOfPages);
  const characterSpecie = useAppSelector(
    (state) => state.filterCharacters.species
  );
  const characterGender = useAppSelector(
    (state) => state.filterCharacters.gender
  );
  const characterNameDebounced = useAppSelector(
    (state) => state.filterCharacters.debouncedName
  );
  const characterStatus = useAppSelector(
    (state) => state.filterCharacters.status
  );

  const fetchCountOfCharactersPages = async () => {
    const response = await axios.get(CHARACTERS_URL);
    dispatch(setAmountOfCharacters(response.data.info.count));
    dispatch(setAmountOfPages(response.data.info.pages));
  };

  const fetchAllCharacters = useFetching(async () => {
    const promises = [];
    for (let i = 1; i <= quantityPages; i++) {
      promises.push(
        axios
          .get(CHARACTERS_URL + `/?page=${i}`)
          .then((response) => response.data.results)
      );
    }
    const result = await Promise.all(promises);
    const response = result.flat();
    dispatch(getCharacters(response));
  });

  useEffect(() => {
    fetchAllCharacters();
    fetchCountOfCharactersPages();
    console.log(quantityPages);
  }, [quantityPages]); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredCharacters = useMemo(() => {
    const filteredBySpecies = characterSpecie
      ? characters.filter((character) => character.species === characterSpecie)
      : characters;

    const filteredByGender = characterGender
      ? filteredBySpecies.filter(
          (character) => character.gender === characterGender
        )
      : filteredBySpecies;

    const filteredByStatus = characterStatus
      ? filteredByGender.filter(
          (character) => character.status === characterStatus
        )
      : filteredByGender;

    const filteredByName = characterNameDebounced
      ? filteredByStatus.filter((character) =>
          character.name
            .toLowerCase()
            .includes(characterNameDebounced.toLowerCase())
        )
      : filteredByStatus;

    return filteredByName;
  }, [
    characters,
    characterSpecie,
    characterGender,
    characterNameDebounced,
    characterStatus,
  ]);

  const isLoadingCharacters = useAppSelector(
    (state) => state.isLoadingError.isLoading
  );
  const isErrorCharacters = useAppSelector(
    (state) => state.isLoadingError.isError
  );

  return (
    <>
      {isErrorCharacters && !isLoadingCharacters && <ErrorPage />}
      {!isErrorCharacters && !isLoadingCharacters && (
        <div className="section-wrapper">
          <div className={styles['top-picture']} />

          <Filter />
          <div className='container--card'>
            {filteredCharacters
              ?.slice(0, quantityCharacters)
              .map((character) => (
                <CharactersCard
                  key={`${character.id}__${character.name}`}
                  character={character}
                />
              ))}
          </div>

          {quantityCharacters < amountOfCharactersFromServer &&
            !isLoadingCharacters && <Button variant='1' quantity={8}>Load more</Button>}
        </div>
      )}
      {isLoadingCharacters && !isErrorCharacters && <Loader />}
    </>
  );
};
