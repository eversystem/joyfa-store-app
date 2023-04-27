import React from 'react';
import { resolveIpfsUri } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/nft-card.module.css';
import { MetadataEntity } from 'src/utils/data';

export const NftCard: React.FC<MetadataEntity> = (props) => {
  const navigate = useNavigate();
  return (
    <div className={styles['wrapper']}>
      <div
        className={styles['nft-image-wrapper']}
        onClick={() => navigate(`/nft/${props.id}`)}
      >
        <img
          className={styles['nft-image']}
          alt="nft-image"
          src={resolveIpfsUri(props.image)}
        />
      </div>
      <div className={styles['nft-details']}>
        <div className={styles['nft-name']}>{props.name}</div>
        {/* <div className="nft-creator">{metadata.creator.name}</div> */}
        <div className={styles['sales-info']}>
          <div className={styles['sold-for']}>Sold for</div>
          <div className={styles['nft-price']}>{props.sale.price}ETH</div>
        </div>
      </div>
    </div>
  );
};
