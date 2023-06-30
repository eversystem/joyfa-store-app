import { LogoDrops } from './elements/DropsLogo';
import { Menu } from './elements/Menu';
import styles from './styles/header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      <div>
        <a href="https://drops.joyfa.io/">
          <LogoDrops />
        </a>
      </div>
      <Menu />
    </header>
  );
};
