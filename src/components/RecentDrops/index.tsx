import { NftList } from './elements/NftList';
import styles from './styles/recent-drops.module.css';

export const RecentDrops: React.FC = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>Recent Drops</div>
      <NftList />
    </div>
  );
};
