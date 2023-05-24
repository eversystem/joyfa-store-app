import { UserEntity } from 'src/utils/data';
import styles from './styles/profile-view.module.css';
import { NFT, useAddress, useContract } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { getUserInfo } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';

export const ProfileView: React.FC = () => {
  const address = useAddress();
  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );
  const [currentAddress, setCuurentAddress] = useState<string | undefined>(
    undefined,
  );
  const [userInfo, setuserInfo] = useState<UserEntity | null>(null);
  const [ownedNfts, setOwnedNfts] = useState<NFT[]>([]);
  useEffect(() => {
    if (address !== currentAddress) {
      setuserInfo(null);
      setCuurentAddress(address);
    } else if (
      nftCollection &&
      address === currentAddress &&
      !userInfo &&
      currentAddress
    ) {
      console.log('update-user-info');
      void nftCollection.getOwned(currentAddress).then((res) => {
        console.log('owned-nfts');
        console.log(res);
        setOwnedNfts(res);
      });
      void getUserInfo(currentAddress).then((res) => {
        console.log('user-info');
        console.log(res);
        setuserInfo(res);
      });
    }
  }, [address, currentAddress, userInfo, nftCollection]);
  return (
    <div className={styles['']}>
      <div>{address}</div>
      <div>{userInfo?.address}</div>
      <div>{userInfo?.name}</div>
    </div>
  );
};
