import LogoJoyfaSVG from 'src/assets/logo-joyfa.svg';
import styles from './styles/joyfa-logo.module.css';

export const LogoJoyfa: React.FC = () => {
  return <img className={styles['image']} src={LogoJoyfaSVG} />;
};
