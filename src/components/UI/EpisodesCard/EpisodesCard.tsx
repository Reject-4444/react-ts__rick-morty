import { FC } from 'react';
import { EpisodesType } from '../../../types/types';
import { Link } from 'react-router-dom';
import styles from './EpisodesCard.module.scss';

interface Props {
  epis: EpisodesType;
}

export const EpisodesCard: FC<Props> = ({ epis }) => {
  const { id, name, air_date, episode } = epis;
  return (
    <Link
      className={styles['episodes-card']}
      to={`/episodes/${id}`}
    >
      <h2 className={styles['episodes-card__name']}>{name}</h2>
      <p className={styles['episodes-card__air_date']}>{air_date}</p>
      <p className={styles['episodes-card__episode']}>{episode}</p>
    </Link>
  );
};
