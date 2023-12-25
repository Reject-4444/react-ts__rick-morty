import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import styles from './FilterLocations.module.scss';
import { actions } from '../../../redux/features/filterLocationsSlice';
import { debounce } from 'lodash';

export const FilterLocations = () => {
  const locationsName = useAppSelector((state) => state.filterLocations.name);
  const locationsType = useAppSelector((state) => state.filterLocations.type);
  const locationsDimension = useAppSelector(
    (state) => state.filterLocations.dimension
  );

  const dispatch = useAppDispatch();
  const filterByName = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.filterByName(e.target.value));
  const filterByDebouncedName = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(actions.filterByDebouncedName(e.target.value));
  const debouncedFilter = useCallback( // eslint-disable-line react-hooks/exhaustive-deps
    debounce(
      (e: ChangeEvent<HTMLInputElement>) => filterByDebouncedName(e),
      1000
    ),
    []
  );

  const handleInputLocations = (e: ChangeEvent<HTMLInputElement>) => {
    filterByName(e);
    debouncedFilter(e);
  };

  const filterByType = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(actions.filterByType(e.target.value));
  const filterByDimension = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(actions.filterByDimension(e.target.value));

  const types = [
    'Planet',
    'Cluster',
    'Space station',
    'Microverse',
    'TV',
    'Resort',
    'Fantasy town',
    'Dream',
  ];
  const dimensions = [
    'Dimension C-137',
    'Post-Apocalyptic Dimension',
    'Replacement Dimension',
    'Cronenberg Dimension',
    'Fantasy Dimension',
    'Dimension 5-126',
  ];

  return (
    <div className={styles['filter-locations']}>
      <input
        value={locationsName}
        onChange={handleInputLocations}
        placeholder='Filter by name...'
        className={styles['filter-locations__input']}
      />
      <select
        value={locationsType}
        onChange={filterByType}
        className={styles['filter-locations__select']}
      >
        <option
          disabled
          value=''
        >
          Type
        </option>
        <option value=''>All</option>
        {types.map((type) => (
          <option
            value={type}
            key={type}
          >
            {type}
          </option>
        ))}
      </select>
      <select
        value={locationsDimension}
        onChange={filterByDimension}
        className={styles['filter-locations__select']}
      >
        <option
          disabled
          value=''
        >
          Dimension
        </option>
        <option value=''>All</option>
        <option value='unknown'>Unknown</option>
        {dimensions.map((dimension) => (
          <option
            value={dimension}
            key={dimension}
          >
            {dimension}
          </option>
        ))}
      </select>
    </div>
  );
};
