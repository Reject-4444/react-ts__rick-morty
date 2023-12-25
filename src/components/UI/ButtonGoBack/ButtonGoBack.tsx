import { useNavigate } from 'react-router-dom';
import styles from './ButtonGoBack.module.scss';

export const ButtonGoBack = () => {
    const navigate = useNavigate();
    return <button onClick={() => navigate(-1)} className={styles['button-go-back']}>go back</button>
}