import { Link, NavLink } from 'react-router-dom';
import '../../../styles/mixins.scss';
import styles from './Header.module.scss';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  doInvisibleMenu,
  doVisibleMenu,
} from '../../../redux/features/isVisibleMenuSlice';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useEffect, useRef } from 'react';

export const Header = () => {
  const generateStyleForLink = ({ isActive }: { isActive: boolean }) => {
    return cn(styles['header__nav-link'], {
      [styles['header__nav-link--active']]: isActive,
    });
  };

  const dispatch = useAppDispatch();

  const isVisibleMenu = useAppSelector((state) => state.isVisibleMenu);
  const makeVisibleMenu = () => dispatch(doVisibleMenu());
  const makeInvisibleMenu = () => dispatch(doInvisibleMenu());
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isVisibleMenu) {
      enableBodyScroll(asideRef.current as HTMLElement);
    } else {
      disableBodyScroll(asideRef.current as HTMLElement);
    }
  }, [isVisibleMenu]);

  return (
    <header className={styles.header}>
      <div className='container container--header'>
        <button
          onClick={makeVisibleMenu}
          className={styles['header__burger-menu']}
        />
        <Link
          to='/'
          className={styles['header__main-logo']}
        />

        <nav className={styles.header__nav}>
          <ul className={styles['header__nav-list']}>
            <li className={styles['header__nav-item']}>
              <NavLink
                className={({ isActive }) => generateStyleForLink({ isActive })}
                to='/'
              >
                Home
              </NavLink>
            </li>

            <li className={styles['header__nav-item']}>
              <NavLink
                className={({ isActive }) => generateStyleForLink({ isActive })}
                to='/characters'
              >
                Characters
              </NavLink>
            </li>

            <li className={styles['header__nav-item']}>
              <NavLink
                className={({ isActive }) => generateStyleForLink({ isActive })}
                to='locations'
              >
                Locations
              </NavLink>
            </li>

            <li className={styles['header__nav-item']}>
              <NavLink
                className={({ isActive }) => generateStyleForLink({ isActive })}
                to='episodes'
              >
                Episodes
              </NavLink>
            </li>
          </ul>
        </nav>

        <aside
          ref={asideRef}
          className={
            !isVisibleMenu ? styles.aside : `${styles.aside} ${styles.active}`
          }
        >
          <div className={styles['aside-container']}>
            <button
              className={styles['aside__button']}
              onClick={makeInvisibleMenu}
            />
            <div className={styles['aside__line']} />
            <Link
              className={styles['aside__link']}
              onClick={makeInvisibleMenu}
              to='/'
            >
              Home
            </Link>
            <div className={styles['aside__line']} />
            <Link
              className={styles['aside__link']}
              onClick={makeInvisibleMenu}
              to='/characters'
            >
              Characters
            </Link>
            <div className={styles['aside__line']} />
            <Link
              className={styles['aside__link']}
              onClick={makeInvisibleMenu}
              to='/locations'
            >
              Locations
            </Link>
            <div className={styles['aside__line']} />
            <Link
              className={styles['aside__link']}
              onClick={makeInvisibleMenu}
              to='/episodes'
            >
              Episodes
            </Link>
            <div className={styles['aside__line']} />
          </div>
        </aside>
      </div>
    </header>
  );
};
