import { useState, startTransition } from 'react';
import { resolveIpfsUri } from '@thirdweb-dev/react';
import { NftEntity } from 'src/utils/data';
import styles from './styles/nft-details.module.css';
import { Model } from './elements/Model';
import { Movie } from './elements/Movie';

export const NftDetails: React.FC<NftEntity> = (props) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const { image, glb_l, animation_url } = props.metadata;
  const contents = [
    <img
      className={styles['image']}
      alt="nft-image"
      src={resolveIpfsUri(image)}
    />,
    glb_l.endsWith('.glb') ? <Model {...props} /> : null,
    animation_url.endsWith('.mp4') ? <Movie {...props} /> : null,
  ];
  const handleArrowClick = (direction: string) => {
    if (direction === 'next') {
      startTransition(() => {
        setCurrentContentIndex(
          (prevIndex) => (prevIndex + 1) % contents.length,
        );
      });
    } else if (direction === 'previous') {
      startTransition(() => {
        setCurrentContentIndex((prevIndex) =>
          prevIndex === 0 ? contents.length - 1 : prevIndex - 1,
        );
      });
    }
  };
  return (
    <div className={styles['wrapper']}>
      <div className={styles['content']}>
        <button
          className={`${styles['arrow-button']} ${styles['arrow-button-left']}`}
          onClick={() => handleArrowClick('previous')}
        />
        <div className={styles['image-wrapper']}>
          {contents[currentContentIndex]}
        </div>
        <button
          className={`${styles['arrow-button']} ${styles['arrow-button-right']}`}
          onClick={() => handleArrowClick('next')}
        />
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
