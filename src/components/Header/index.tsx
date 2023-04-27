import { LogoJoyfa } from './elements/JoyfaLogo';
import { Menu } from './elements/Menu';
import styles from './styles/header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <LogoJoyfa />
      <Menu />
    </header>
  );
};
