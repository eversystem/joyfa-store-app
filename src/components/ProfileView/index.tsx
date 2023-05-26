import { NftEntity, UserEntity } from 'src/utils/data';
import styles from './styles/profile-view.module.css';
import { NFT, useAddress, useContract } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { getNftsByCreator, getUserInfo } from 'src/api';
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
  const [createdNfts, setCreatedNfts] = useState<NftEntity[]>([]);
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
      void nftCollection.getOwned(currentAddress).then((nfts) => {
        console.log('owned-nfts');
        console.log(nfts);
        setOwnedNfts(nfts);
      });
      void getUserInfo(currentAddress).then((user) => {
        console.log('user-info');
        console.log(user);
        setuserInfo(user);
        if (user.creator) {
          void getNftsByCreator(user.address).then((nfts) => {
            setCreatedNfts(nfts);
          });
        }
      });
    }
  }, [address, currentAddress, userInfo, nftCollection]);
  return (
    <div className={styles['']}>
      <div>{address}</div>
      <div>{userInfo?.address}</div>
      <div>{userInfo?.name}</div>
      Owned NFT
      {ownedNfts.map((nft) => (
        <div key={nft.metadata.name}>{nft.metadata.name}</div>
      ))}
      <br />
      {userInfo?.creator && (
        <div>
          Created NFT
          {createdNfts.map((nft) => (
            <div key={nft.id}>{nft.metadata.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
