import { MenuLink } from './elements/MenuLink';
import { WalletButton } from './elements/WalletButton';
import styles from './styles/header-menu.module.css';

export const Menu: React.FC = () => {
  return (
    <div className={styles['menu']}>
      <MenuLink text="Home" link="/" />
      <MenuLink text="Store" link="/drops" />
      <MenuLink text="Create" link="/create" />
      <MenuLink text="Profile" link="/profile" />
      <WalletButton />
    </div>
  );
};
