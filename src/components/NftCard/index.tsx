import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './styles/nft-card.module.css';
import { NftEntity } from 'src/utils/data';
import { resolveIpfsUri } from 'src/utils/resolve-ipfs-uri';

export type NftCardProps = NftEntity & { tokenId?: string };

export const NftCard: React.FC<NftCardProps> = (props) => {
  // const navigate = useNavigate();
  return (
    <div
      className={styles['wrapper']}
      // onClick={() => navigate(`/nft/${props.id}`)}
      onClick={() => {
        if (window.location.href.includes('mystudio')) {
          window.location.href = `${window.location.origin}/mystudio/nft/${props.id}`;
        } else {
          window.location.href = `${window.location.origin}/nft/${props.id}`;
        }
      }}
    >
      <div className={styles['nft-image-wrapper']}>
        <img
          className={styles['nft-image']}
          alt="nft-image"
          src={resolveIpfsUri(props.metadata.image)}
        />
      </div>
      <div className={styles['nft-details']}>
        <div className={styles['nft-name']}>
          {props.metadata.name}
          {props.tokenId ? ` #${props.tokenId}/${props.supply.amount}` : ''}
        </div>
        {/* [TODO] */}
        {props.creator.name && props.creator.icon && (
          <div className={styles['nft-creator']}>
            <img
              className={styles['nft-creator-icon']}
              src={props.creator.icon}
            />
            <div className={styles['nft-creator-name']}>
              {props.creator.name}
            </div>
          </div>
        )}
        <div className={styles['sales-info']}>
          {props.supply.price !== -1 ? (
            <>
              <div className={styles['sold-for']}>Sold for</div>
              <div className={styles['nft-price']}>
                {props.supply.price}&nbsp;ETH
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
