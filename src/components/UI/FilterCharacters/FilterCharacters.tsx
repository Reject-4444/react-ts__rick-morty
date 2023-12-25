import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import styles from './FilterCharacters.module.scss';
import { actions as filterCharactersActions } from '../../../redux/features/filterCharactersSlice';
import { debounce } from 'lodash';

export const Filter = () => {
  const dispatch = useAppDispatch();
  const characterSpecie = useAppSelector(
    (state) => state.filterCharacters.species
  );
  const characterName = useAppSelector((state) => state.filterCharacters.name);
  const characterStatus = useAppSelector(
    (state) => state.filterCharacters.status
  );
  const characterGender = useAppSelector(
    (state) => state.filterCharacters.gender
  );

  const filterBySpecies = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(filterCharactersActions.filterBySpecies(e.target.value));

  const filterByStatus = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(filterCharactersActions.filterByStatus(e.target.value));

  const filterByGender = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(filterCharactersActions.filterByGender(e.target.value));

  const filterByName = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(filterCharactersActions.filterByName(e.target.value));

  const filterByNameDebounced = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterCharactersActions.filterByDebouncedName(e.target.value));
  }

  const debouncedFilterByName = useCallback( // eslint-disable-line react-hooks/exhaustive-deps
    debounce((e: ChangeEvent<HTMLInputElement>) => filterByNameDebounced(e), 1000),
    []
  ); 

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    filterByName(e);
    debouncedFilterByName(e);
  };

  return (
    <div className={styles.filter}>
      <input
        value={characterName}
        onChange={handleNameChange}
        placeholder='Filter by name...'
        className={styles.filter__input}
        type='text'
      ></input>
      <select
        onChange={filterBySpecies}
        value={characterSpecie}
        className={styles.filter__select}
      >
        <option
          disabled
          value=''
        >
          Species
        </option>
        <option value=''>All</option>
        <option value='Human'>Human</option>
        <option value='Alien'>Alien</option>
        <option value='Humanoid'>Humanoid</option>
        <option value='Robot'>Robot</option>
        <option value='Animal'>Animal</option>
        <option value='Disease'>Disease</option>
        <option value='Cronenberg'>Cronenberg</option>
        <option value='Poopybutthole'>Poopybutthole</option>
        <option value='Mythological Creature'>Mythological Creature</option>
        <option value='unknown'>Unknown</option>
      </select>
      <select
        onChange={filterByGender}
        value={characterGender}
        className={styles.filter__select}
      >
        <option
          disabled
          value=''
        >
          Gender
        </option>
        <option value=''>All</option>
        <option value='Female'>Female</option>
        <option value='Male'>Male</option>
        <option value='Genderless'>Genderless</option>
        <option value='unknown'>Unknown</option>
      </select>
      <select
        onChange={filterByStatus}
        value={characterStatus}
        className={styles.filter__select}
      >
        <option
          disabled
          value=''
        >
          Status
        </option>
        <option value=''>All</option>
        <option value='Alive'>Alive</option>
        <option value='Dead'>Dead</option>
        <option value='unknown'>Unknown</option>
      </select>
    </div>
  );
};
