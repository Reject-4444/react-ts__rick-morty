import { FC } from "react";
import styles from './ImageCharacterDetails.module.scss';

interface Props {
    source: string | undefined;
}

export const ImageCharacterDetails: FC<Props> = ({source}) => {
    return <img className={styles['image-character-details']} src={source} alt="hero from movie" />
}