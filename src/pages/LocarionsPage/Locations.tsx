import axios from 'axios';
import { FilterLocations } from '../../components/UI/FilterLocations/FilterLocations';
import { useFetching } from '../../hooks/useFetching';
import styles from './Locations.module.scss';
import { LOCATIONS_URL } from '../../API/urls';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  setAmountOfLocations,
  setAmountOfPagesLocations,
} from '../../redux/features/loadMoreLocationsSlice';
import { LocationsType } from '../../types/types';
import { getLocations } from '../../redux/features/locationsSlice';
import { useEffect, useMemo } from 'react';
import { LocationsCard } from '../../components/UI/LocationsCard/LocationsCard';
import { Button } from '../../components/UI/ButtonLoadMore/Button';
import { Loader } from '../../components/UI/Loader/Loader';
import { ErrorPage } from '../ErrorPage/ErrorPage';

export const Locations = () => {
  const dispatch = useAppDispatch();
  const fetchCountOfEpisodesPages = async () => {
    const response = await axios.get(LOCATIONS_URL);
    dispatch(setAmountOfLocations(response.data.info.count));
    dispatch(setAmountOfPagesLocations(response.data.info.pages));
  };

  const amountOfLocationsFromServer = useAppSelector(
    (state) => state.loadMoreLocations.amountOfLocations
  );
  const quantityLocations = useAppSelector(
    (state) => state.loadMoreLocations.quantityLocations
  );
  const quantityPages = useAppSelector(
    (state) => state.loadMoreLocations.amountOfLocationsPages
  );

  const setLocations = (locations: LocationsType[]) =>
    dispatch(getLocations(locations));

  const fetchAllLocations = useFetching(async () => {
    const promises = [];
    for (let i = 1; i <= quantityPages; i++) {
      promises.push(
        axios
          .get(LOCATIONS_URL + `?page=${i}`)
          .then((response) => response.data.results)
      );
    }
    const result = await Promise.all(promises);
    const response = result.flat();
    setLocations(response);
  });

  useEffect(() => {
    fetchAllLocations();
    fetchCountOfEpisodesPages();
  }, [quantityPages]); // eslint-disable-line react-hooks/exhaustive-deps

  const locations = useAppSelector((state) => state.locations.locations);

  const isLoading = useAppSelector((state) => state.isLoadingError.isLoading);
  const isError = useAppSelector((state) => state.isLoadingError.isError);

  const locationsName = useAppSelector(
    (state) => state.filterLocations.debouncedName
  );
  const locationsType = useAppSelector((state) => state.filterLocations.type);
  const locationsDimension = useAppSelector(
    (state) => state.filterLocations.dimension
  );

  const filteredLocations = useMemo(() => {
    const filteredByName = locationsName
      ? locations.filter((location) =>
          location.name.toLowerCase().includes(locationsName.toLowerCase())
        )
      : locations;

    const filteredByType = locationsType
      ? filteredByName.filter((location) => location.type === locationsType)
      : filteredByName;

    const filteredByDimension = locationsDimension
      ? filteredByType.filter(
          (location) => location.dimension === locationsDimension
        )
      : filteredByType;

    return filteredByDimension;
  }, [locations, locationsName, locationsType, locationsDimension]);

  return (
    <>
      {isError && !isLoading && <ErrorPage />}
      {!isError && !isLoading && (
        <div className='section-wrapper'>
          <div className={styles['top-picture-locations']} />
          <FilterLocations />
          <div className='container--card'>
            {filteredLocations.slice(0, quantityLocations).map((location) => (
              <LocationsCard
                location={location}
                key={location.id}
              />
            ))}
          </div>
          {quantityLocations < amountOfLocationsFromServer && !isLoading && (
            <Button
              variant='2'
              quantity={12}
            >
              Load more
            </Button>
          )}
        </div>
      )}
      {isLoading && !isError && <Loader />}
    </>
  );
};
