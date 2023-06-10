import { NftEntity, UserEntity } from 'src/utils/data';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile-view.module.css';
import { NFT, useAddress, useContract } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { getNftsByCreator, getUserInfo } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { NftCard } from '../NftCard';
import { NftCardById } from './elements/NftCardById';

export const ProfileView: React.FC = () => {
  const address = useAddress();
  const navigate = useNavigate();
  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );
  const [currentAddress, setCurrentAddress] = useState<string | undefined>(
    undefined,
  );
  const [userInfo, setUserInfo] = useState<UserEntity | null>(null);
  const [ownedNfts, setOwnedNfts] = useState<NFT[]>([]);
  const [createdNfts, setCreatedNfts] = useState<NftEntity[]>([]);
  useEffect(() => {
    if (address !== currentAddress) {
      setUserInfo(null);
      setCurrentAddress(address);
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
        setUserInfo(user);
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
      {userInfo && (
        <div>
          <div className={styles['img-cover']}>
            <img src={userInfo.cover || undefined} />
          </div>
          <main>
            <div>
              <button onClick={() => navigate('/profile/edit')}>edit</button>
            </div>
            <div className={styles['img-icon']}>
              <img src={userInfo.icon || undefined} />
            </div>
            <div className={styles['name']}>Name: {userInfo.name}</div>
            <div className={styles['address']}>Address: {address}</div>
            <div className={styles['description']}>
              Description: {userInfo.description}
            </div>
            <div className={styles['socials']}>
              <div className={styles['twitter']}>
                Twitter: {userInfo.twitter}
              </div>
              <div className={styles['instagram']}>
                Instagram: {userInfo.instagram}
              </div>
              <div className={styles['website']}>
                Website: {userInfo.website}
              </div>
            </div>
          </main>
          {ownedNfts.length ? (
            <div>
              <div className={styles['cntents-label']}>Collection</div>
              <div className={styles['nft-list']}>
                {ownedNfts.map((nft) => (
                  <NftCardById key={nft.metadata.id} {...nft} />
                ))}
              </div>
            </div>
          ) : null}
          <br />
          {userInfo?.creator && (
            <main>
              <div>
                <div className={styles['cntents-label']}>Created NFT</div>
                <div className={styles['nft-list']}>
                  {createdNfts.map((nft, i) => (
                    <NftCard key={i} {...nft} />
                  ))}
                </div>
              </div>
            </main>
          )}
        </div>
      )}
    </div>
  );
};
