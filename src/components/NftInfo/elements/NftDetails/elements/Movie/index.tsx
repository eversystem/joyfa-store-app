import { useState } from 'react';
import { NftEntity } from 'src/utils/data';
import styles from './styles/movie.module.css';
import { resolveIpfsUri } from 'src/utils/resolve-ipfs-uri';
import MutedIcon from 'src/assets/muted.svg';
import UnMutedIcon from 'src/assets/unmuted.svg';

export const Movie: React.FC<NftEntity> = (props) => {
  const [muted, setMuted] = useState(true);

  const handleMute = () => {
    setMuted(!muted);
  };

  return (
    <div className={styles['video-container']}>
      <video loop autoPlay muted={muted} className={styles['video']}>
        <source
          src={resolveIpfsUri(props.metadata.animation_url)}
          type="video/mp4"
        />
      </video>
      <button onClick={handleMute} className={styles['mute-button']}>
        {muted ? (
          <img src={MutedIcon} alt="Muted" />
        ) : (
          <img src={UnMutedIcon} alt="UnMuted" />
        )}
      </button>
    </div>
  );
};
