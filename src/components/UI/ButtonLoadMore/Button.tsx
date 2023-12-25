import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { loadMoreCharacters } from '../../../redux/features/loadMoreCharactersSlice';
import { loadMoreLocations } from '../../../redux/features/loadMoreLocationsSlice';
import { loadMoreEpisodes } from '../../../redux/features/loadMoreEpisodesSlice';

interface Props {
  children: ReactNode;
  quantity: number;
  variant: string;
}

export const Button: FC<Props> = ({ children, quantity, variant }) => {
  const dispatch = useAppDispatch();
  const loadMoreCards = (quantity: number) => {
    if (variant === '1') {
      return dispatch(loadMoreCharacters(quantity));
    } else if (variant === '2') {
      return dispatch(loadMoreLocations(quantity));
    } else {
      return dispatch(loadMoreEpisodes(quantity));
    }
  };

  return (
    <button
      onClick={() => loadMoreCards(quantity)}
      className={styles.button}
    >
      {children}
    </button>
  );
};
