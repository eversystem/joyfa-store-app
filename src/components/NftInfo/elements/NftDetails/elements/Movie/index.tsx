import { NftEntity } from 'src/utils/data';
import styles from './styles/movie.module.css';
import { resolveIpfsUri } from '@thirdweb-dev/react';

export const Movie: React.FC<NftEntity> = (props) => {
  return (
    <video
      loop
      autoPlay
      // controls={false}
      controls
      className={styles['video']}
      width={'150px'}
    >
      <source
        src={resolveIpfsUri(props.metadata.animation_url)}
        type="video/mp4"
      />
    </video>
  );
};
