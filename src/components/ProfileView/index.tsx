import { NftEntity, UserEntity } from 'src/utils/data';
import styles from './styles/profile-view.module.css';
import { NFT, useAddress, useContract } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { getNftsByCreator, getUserInfo } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { NftCard } from '../NftCard';
import { NftCardById } from './elements/NftCardById';

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
      {ownedNfts.length && (
        <div>
          <div className={styles['cntents-label']}>Collection</div>
          <div className={styles['nft-list']}>
            {ownedNfts.map((nft) => (
              <NftCardById key={nft.metadata.id} {...nft} />
            ))}
          </div>
        </div>
      )}
      <br />
      {userInfo?.creator && (
        <div>
          <div className={styles['cntents-label']}>Created NFT</div>
          <div className={styles['nft-list']}>
            {createdNfts.map((nft) => (
              <NftCard {...nft} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
