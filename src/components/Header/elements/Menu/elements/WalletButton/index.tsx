import { ConnectWallet } from '@thirdweb-dev/react';
import styles from './styles/component.module.css';

export const WalletButton: React.FC = () => {
  return (
    <div className={styles['wallet-button']}>
      <ConnectWallet theme="light" />
    </div>
  );
};
