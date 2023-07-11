import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { MenuLink } from './elements/MenuLink';
import { WalletButton } from './elements/WalletButton';
import styles from './styles/header-menu.module.css';
import { isCreatorAddress } from 'src/api';

export const Menu: React.FC = () => {
  const address = useAddress();
  const [isCreator, setIsCretor] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (address) {
      void isCreatorAddress(address).then((res) => {
        console.log(res);
        setIsCretor(res);
      });
    }
  }, [address]);

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
        <MenuLink text="Home" link="/" />
        {isCreator && <MenuLink text="Create" link="/create" />}
        {address && <MenuLink text="Profile" link="/profile" />}
        <WalletButton />
      </div>
    </div>
  );
};
