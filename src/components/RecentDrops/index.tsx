import React, { useState, MouseEvent } from 'react';
import MainImage from 'src/assets/main-image.png';
import HowImage1 from 'src/assets/how1.png';
import HowImage2 from 'src/assets/how2.png';
import HowImage3 from 'src/assets/how3.png';
import { NftList } from './elements/NftList';
import styles from './styles/recent-drops.module.css';

export const RecentDrops: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosX, setStartPosX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosX(e.clientX);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.clientX;
    const walk = (x - startPosX) * 2; // 2は移動の速さを制御する係数です
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <img className={styles['main-image']} src={MainImage} />
        <div className={styles['main-box']}>
          <div className={styles['main-title']}>10.19 Genesis Shoe</div>
          <div className={styles['main-description']}>
            by Tokyo White International
          </div>
        </div>
      </div>
      <div className={styles['title']}>Recent Drops</div>
      <NftList />
      <div className={styles['title']}>How Joyfa Works</div>
      <div
        className={styles['how-wrapper']}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      >
        <div className={styles['how-box']}>
          <img
            className={styles['how-image']}
            src={HowImage1}
            draggable="false"
          />
          <div className={styles['how-text']}>
            <p className={styles['how-number']}>01</p>
            <div className={styles['how-details']}>
              <p className={styles['how-title']}>Collect</p>
              <p className={styles['how-description']}>
                Get digital sneakers by selecting your favorite IDs!
              </p>
            </div>
          </div>
        </div>
        <div className={styles['how-box']}>
          <img
            className={styles['how-image']}
            src={HowImage2}
            draggable="false"
          />
          <div className={styles['how-text']}>
            <p className={styles['how-number']}>02</p>
            <div className={styles['how-details']}>
              <p className={styles['how-title']}>Wear</p>
              <p className={styles['how-description']}>
                Go to&nbsp;
                <a
                  href="https://mystudio.joyfa.io/"
                  target="_blank"
                  draggable="false"
                >
                  MyStudio
                </a>
                &nbsp;and flaunt your digital kicks with AR.
              </p>
            </div>
          </div>
        </div>
        <div className={styles['how-box']}>
          <img
            className={styles['how-image']}
            src={HowImage3}
            draggable="false"
          />
          <div className={styles['how-text']}>
            <p className={styles['how-number']}>03</p>
            <div className={styles['how-details']}>
              <p className={styles['how-title']}>More</p>
              <p className={styles['how-description']}>
                We've got even more cool stuff coming your way. Stay tuned!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
