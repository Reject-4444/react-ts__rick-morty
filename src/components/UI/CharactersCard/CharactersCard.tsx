import { FC } from 'react';
import style from './CharactersCard.module.scss';
import { CharactersType } from '../../../types/types';
import { Link } from 'react-router-dom';

interface Props {
  character: CharactersType;
}

export const CharactersCard: FC<Props> = ({ character }) => {
  const { id, name, species, image } = character;
  return (
      <Link to={`/characters/${id}`} className={style.card}>
        <img
          className={style.card__image}
          src={image}
          alt='hero from movie'
        />
        <h2 className={style.card__name}>{name}</h2>
        <p className={style.card__specie}>{species}</p>
      </Link>
  );
};
