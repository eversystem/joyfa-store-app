import { LogoDrops } from './elements/DropsLogo';
import { WalletButton } from './elements/Menu/elements/WalletButton';
// import { LogoJoyfa } from './elements/JoyfaLogo';
// import { Menu } from './elements/Menu';
import styles from './styles/header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles['header']}>
      {/* <LogoJoyfa /> */}
      {/* <Menu /> */}
      <div>
        <LogoDrops />
        <div className={styles['title']}>Drops</div>
      </div>
      <div className={styles['wallet-button']}>
        <WalletButton />
      </div>
    </header>
  );
};
