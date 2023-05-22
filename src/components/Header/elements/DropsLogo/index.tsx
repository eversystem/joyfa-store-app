import LogoDropsSVG from 'src/assets/logo-drops.svg';
import styles from './styles/drops-logo.module.css';

export const LogoDrops: React.FC = () => {
  return <img className={styles['image']} src={LogoDropsSVG} />;
};
