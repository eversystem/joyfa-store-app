import { NftList } from './elements/NftList';
import styles from './styles/recent-drops.module.css';

export const RecentDrops: React.FC = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['main']}>
        <div className={styles['main-title']}>
          The Dawn of the Digital Sneaker Movement
        </div>
      </div>
      <div className={styles['title']}>Recent Drops</div>
      <NftList />
    </div>
  );
};
