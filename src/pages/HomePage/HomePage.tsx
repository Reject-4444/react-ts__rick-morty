import styles from './HomePage.module.scss';
import sliderImage1 from '../../images/rickandmorty1.png';
import sliderImage2 from '../../images/rickandmorty4.png';
import sliderImage3 from '../../images/rickandmorty5.png';
import sliderImage4 from '../../images/rickandmorty6.png';
import sliderImage5 from '../../images/rickandmorty7.png';
import sliderImage6 from '../../images/rickandmorty8.png';
import { useEffect, useState } from 'react';
import cn from 'classnames';

export const HomePage = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliders = [
    sliderImage2,
    sliderImage1,
    sliderImage3,
    sliderImage4,
    sliderImage5,
    sliderImage6,
  ];

  useEffect(() => {
    const inervalId = setInterval(() => {
      setSliderIndex(
        (prevSliderIndex) => (prevSliderIndex + 1) % sliders.length
      );
    }, 3000);

    return () => {
      clearInterval(inervalId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles['home-page']}>
      <h1 className={styles['home-page__title']}>
        Welcome to the website of fans of the cult animated series Rick and
        Morty!
      </h1>
      <img
        className={styles['home-page__image']}
        src={sliders[sliderIndex]}
        alt='main heroes'
      />
      <div className={styles['home-page__buttons']}>
        {sliders.map((slider, index) => (
          <button
            onClick={() => setSliderIndex(index)}
            className={cn(styles['home-page__buttons-button'], {
              [styles['home-page__buttons-button--active']]:
                sliderIndex === index,
            })}
            key={slider}
          />
        ))}
      </div>
      <p className={styles['home-page__description']}>
        "Rick and Morty" is an animated science fiction sitcom created by Justin
        Roiland and Dan Harmon. The show follows the misadventures of an
        eccentric, alcoholic scientist, Rick Sanchez, and his good-hearted but
        easily influenced grandson, Morty Smith. Known for its dark humor,
        intricate storytelling, and imaginative exploration of parallel
        universes, the series has gained a cult following since its debut in
        2013.
      </p>
    </div>
  );
};
