import { resolveIpfsUri } from '@thirdweb-dev/react';
import { MetadataEntity } from 'src/utils/data';
import styles from './styles/nft-details.module.css';

export const NftDetails: React.FC<MetadataEntity> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['image-wrapper']}>
        <img
          className={styles['image']}
          alt="nft-image"
          src={resolveIpfsUri(props.image)}
        />
      </div>
      <div className={styles['']}>
        <div className={styles['name']}>{props.name}</div>
        <div className={styles['creator']}>{props.creator.name}</div>
        <div className={styles['price']}>
          <div className={styles['price-prefix']}>Price: </div>
          <div className={styles['price-content']}>{props.sale.price} ETH</div>
        </div>
        <p className={styles['description']}>{props.description}</p>
      </div>
    </div>
  );
};
