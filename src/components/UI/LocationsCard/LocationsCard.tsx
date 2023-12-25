import { FC } from 'react';
import { LocationsType } from '../../../types/types';
import { Link } from 'react-router-dom';
import styles from './LocationsCard.module.scss';

interface Props {
  location: LocationsType;
}

export const LocationsCard: FC<Props> = ({ location }) => {
  const { id, name, type } = location;
  return (
    <Link
      className={styles['locations-card']}
      to={`/locations/${id}`}
    >
      <h2 className={styles['locations-card__name']}>{name}</h2>
      <p className={styles['locations-card__type']}>{type}</p>
    </Link>
  );
};
