import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './ErrorPage.module.scss';

export const ErrorPage = () => {
  const error = useAppSelector((state) => state.isLoadingError.isError);
  return (
    <div className={styles['error-page']}>
        <h1 className={styles['error-page__title-main']}>Oops, something went wrong...</h1>
        <h2 className={styles['error-page__title']}>{error}</h2>
        <Link className={styles['error-page__button']} to="/">Go to home page</Link>
    </div>
  );
};
