import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { MenuLink } from './elements/MenuLink';
import { WalletButton } from './elements/WalletButton';
import styles from './styles/header-menu.module.css';
import { isCreatorAddress } from 'src/api';

export const Menu: React.FC = () => {
  // const sdk = useSDK();
  const address = useAddress();
  const [isCreator, setIsCretor] = useState<boolean>(false);
  // const [status, setStatus] = useState<ListingStatus>('input');
  // const [name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [image, setImage] = useState<File | null>(null);
  // const [animation, setAnimation] = useState<File | null>(null);
  // const [glbL, setGLBL] = useState<File | null>(null);
  // const [glbR, setGLBR] = useState<File | null>(null);
  // const [price, setPrice] = useState('0');
  // const [supply, setSupply] = useState('1');
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
        <MenuLink text="Top" link="/drops" />
        {isCreator && <MenuLink text="Create" link="/create" />}
        <MenuLink text="Profile" link="/profile" />
        <WalletButton />
      </div>
    </div>
  );
};
