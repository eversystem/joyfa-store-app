import { MenuLink } from './elements/MenuLink';
import { WalletButton } from './elements/WalletButton';
import styles from './styles/header-menu.module.css';

export const Menu: React.FC = () => {
  return (
    <div className={styles['menu']}>
      <MenuLink text="Home" link="/" />
      <MenuLink text="Store" link="/drops" />
      <MenuLink text="My Studio" link="/create" />
      <MenuLink text="Contact" link="" />
      <WalletButton />
    </div>
  );
};
