import { NftEntity } from 'src/utils/data';
import styles from './styles/movie.module.css';
import { resolveIpfsUri } from 'src/utils/resolve-ipfs-uri';

export const Movie: React.FC<NftEntity> = (props) => {
  return (
    <video loop autoPlay className={styles['video']} width={'100%;'}>
      <source
        src={resolveIpfsUri(props.metadata.animation_url)}
        type="video/mp4"
      />
    </video>
  );
};
