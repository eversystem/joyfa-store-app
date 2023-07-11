import { useState, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { resolveIpfsUri } from 'src/utils/resolve-ipfs-uri';
import { NftEntity } from 'src/utils/data';
import styles from './styles/nft-details.module.css';
import { Model } from './elements/Model';
import { Movie } from './elements/Movie';
enum ContentsType {
  IMAGE,
  MODEL,
  VIDEO,
}

export type NftDetailsProps = NftEntity & {
  mintedNfts: number;
  handleCollectButtonClick: () => void;
};

export const NftDetails: React.FC<NftDetailsProps> = (props) => {
  const {
    metadata: { image, glb_l, animation_url },
    handleCollectButtonClick,
  } = props;
  const navigate = useNavigate();
  const [contents, setContents] = useState<ContentsType>(ContentsType.IMAGE);
  const ContentsElements = [
    <img
      className={styles['image']}
      alt="nft-image"
      src={resolveIpfsUri(image)}
    />,
    glb_l.endsWith('.glb') ? <Model {...props} /> : null,
    animation_url && animation_url.endsWith('.mp4') ? (
      <Movie {...props} />
    ) : null,
  ];
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <div className={styles['image-wrapper']}>
          {ContentsElements[contents] || null}
        </div>
      </div>
      <div className={styles['contents-selector']}>
        <button
          className={
            contents === ContentsType.IMAGE
              ? styles['contents-button-selected']
              : styles['contents-button']
          }
          onClick={() => startTransition(() => setContents(ContentsType.IMAGE))}
        >
          Image
        </button>
        <button
          className={
            contents === ContentsType.MODEL
              ? styles['contents-button-selected']
              : styles['contents-button']
          }
          onClick={() => startTransition(() => setContents(ContentsType.MODEL))}
        >
          3D
        </button>
        {animation_url && (
          <button
            className={
              contents === ContentsType.VIDEO
                ? styles['contents-button-selected']
                : styles['contents-button']
            }
            onClick={() =>
              startTransition(() => setContents(ContentsType.VIDEO))
            }
          >
            Video
          </button>
        )}
      </div>
      <div className={styles['info']}>
        <div className={styles['name']}>{props.metadata.name}</div>
        <div
          className={styles['creator']}
          onClick={() => {
            navigate(`/user/${props.creator.address}`);
          }}
        >
          <img className={styles['creator-icon']} src={props.creator.icon} />
          <div className={styles['creator-name']}>{props.creator.name}</div>
        </div>
        <div className={styles['info-left']}>
          <div className={styles['info-title']}>Story</div>
          <div className={styles['description']}>
            {props.metadata.description.split('\n').map((paragraph, i) => (
              <div key={i} className={styles['description-text']}>
                {paragraph}
              </div>
            ))}
          </div>
          <div className={styles['info-title']}>How to wear</div>
          <div className={styles['description']}>
            Once collected, go to&nbsp;
            <a href="https://mystudio.joyfa.io/" target="_blank">
              My Studio
            </a>
            &nbsp;and choose your NFT. You will then be able to wear the sneaker
            over AR.
          </div>
          <div className={styles['info-title']}>Blockchain</div>
          <div className={styles['description']}>Ethereum</div>
        </div>
        <div className={styles['info-right']}>
          <div className={styles['price_supply']}>
            <span className={styles['price_supply-prefix']}>Price&nbsp;</span>
            <span className={styles['price_supply-content']}>
              {props.supply.price} ETH
            </span>
          </div>
          <div className={styles['price_supply']}>
            <span className={styles['price_supply-prefix']}>Supply&nbsp;</span>
            <span className={styles['price_supply-content']}>
              {props.mintedNfts === -1
                ? '--'
                : props.supply.amount - props.mintedNfts}{' '}
              / {props.supply.amount}
            </span>
          </div>
          <button
            className={styles['button']}
            onClick={handleCollectButtonClick}
          >
            Collect
          </button>
        </div>
      </div>
    </div>
  );
};
