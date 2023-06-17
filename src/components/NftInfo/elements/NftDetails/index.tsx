import { useState, startTransition } from 'react';
import { resolveIpfsUri } from '@thirdweb-dev/react';
import { NftEntity } from 'src/utils/data';
import styles from './styles/nft-details.module.css';
import { Model } from './elements/Model';
import { Movie } from './elements/Movie';
enum ContentsType {
  IMAGE,
  MODEL,
  VIDEO,
}

export const NftDetails: React.FC<NftEntity> = (props) => {
  const { image, glb_l, animation_url } = props.metadata;
  const [contents, setContents] = useState<ContentsType>(ContentsType.IMAGE);
  const ContentsElements = [
    <img
      className={styles['image']}
      alt="nft-image"
      src={resolveIpfsUri(image)}
    />,
    glb_l.endsWith('.glb') ? <Model {...props} /> : null,
    animation_url.endsWith('.mp4') ? <Movie {...props} /> : null,
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
        <button
          className={
            contents === ContentsType.VIDEO
              ? styles['contents-button-selected']
              : styles['contents-button']
          }
          onClick={() => startTransition(() => setContents(ContentsType.VIDEO))}
        >
          Video
        </button>
      </div>
      <div className={styles['info']}>
        <div className={styles['name']}>{props.metadata.name}</div>
        <div className={styles['creator']}>{props.creator.name}</div>
        <div className={styles['price']}>
          <div className={styles['price-prefix']}>Price</div>
          <div className={styles['price-content']}>
            {props.supply.price} ETH
          </div>
        </div>
        <div className={styles['description']}>
          {props.metadata.description.split('\n').map((paragraph, i) => (
            <div key={i} className={styles['description-text']}>
              {paragraph}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
