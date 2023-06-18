import { MenuLink } from './elements/MenuLink';
import { WalletButton } from './elements/WalletButton';
import styles from './styles/header-menu.module.css';
import { useState } from 'react';

export const Menu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles['menu']}>
      <button
        className={`${styles['hamburger']} ${isOpen ? styles['open'] : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles['line']}></div>
        <div className={styles['line']}></div>
        <div className={styles['line']}></div>
      </button>
      <div
        className={`${styles['menu-links']} ${isOpen ? styles['open'] : ''}`}
      >
        <MenuLink text="Top" link="/drops" />
        <MenuLink text="Create" link="/create" />
        <MenuLink text="Profile" link="/profile" />
        <WalletButton />
      </div>
    </div>
  );
};
