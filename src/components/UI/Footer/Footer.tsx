import styles from './Footer.module.scss';

export const Footer = () => {
  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <p>Make with ❤️ for the MobProgramming team</p>
      <button
        onClick={handleGoTop}
        className={styles.footer__button}
      >
        ☝
      </button>
    </footer>
  );
};
