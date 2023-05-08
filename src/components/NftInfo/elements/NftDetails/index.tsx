import { resolveIpfsUri } from '@thirdweb-dev/react';
import { NftEntity } from 'src/utils/data';
import styles from './styles/nft-details.module.css';

export const NftDetails: React.FC<NftEntity> = (props) => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['image-wrapper']}>
        <img
          className={styles['image']}
          alt="nft-image"
          src={resolveIpfsUri(props.metadata.image)}
        />
      </div>
      <div className={styles['']}>
        <div className={styles['name']}>{props.metadata.name}</div>
        <div className={styles['creator']}>{props.creator.name}</div>
        <div className={styles['price']}>
          <div className={styles['price-prefix']}>Price: </div>
          <div className={styles['price-content']}>
            {props.supply.price} ETH
          </div>
        </div>
        <p className={styles['description']}>{props.metadata.description}</p>
      </div>
    </div>
  );
};
