import React from 'react';
import { resolveIpfsUri } from '@thirdweb-dev/react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/nft-card.module.css';
import { NftEntity } from 'src/utils/data';

export const NftCard: React.FC<NftEntity> = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles['wrapper']}
      onClick={() => navigate(`/nft/${props.id}`)}
    >
      <div className={styles['nft-image-wrapper']}>
        <img
          className={styles['nft-image']}
          alt="nft-image"
          src={resolveIpfsUri(props.metadata.image)}
        />
      </div>
      <div className={styles['nft-details']}>
        <div className={styles['nft-name']}>{props.metadata.name}</div>
        <div className="nft-creator">{props.creator.name}</div>
        <div className={styles['sales-info']}>
          <div className={styles['sold-for']}>Sold for</div>
          <div className={styles['nft-price']}>{props.supply.price}ETH</div>
        </div>
      </div>
    </div>
  );
};
