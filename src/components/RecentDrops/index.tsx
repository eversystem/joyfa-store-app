import MainImage from 'src/assets/main-image.png';
import { NftList } from './elements/NftList';
import styles from './styles/recent-drops.module.css';

export const RecentDrops: React.FC = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['main']}>
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
    </div>
  );
};
