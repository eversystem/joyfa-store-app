import { NftEntity, UserEntity } from 'src/utils/data';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile-view.module.css';
import { NFT, useAddress, useContract } from '@thirdweb-dev/react';
import { useState, useEffect, useRef } from 'react';
import { getNftsByCreator, getUserInfo } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { NftCard } from '../NftCard';
import { NftCardById } from './elements/NftCardById';
import ProfileTwitterSvg from 'src/assets/profile-twitter.svg';
import ProfileInstagramSvg from 'src/assets/profile-instagram.svg';
import ProfileWebsiteSvg from 'src/assets/profile-website.svg';
import ProfileEtherscanSvg from 'src/assets/profile-etherscan.svg';

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
        if (user?.creator) {
          void getNftsByCreator(user.address).then((nfts) => {
            setCreatedNfts(nfts);
          });
        }
      });
    }
  }, [address, currentAddress, userInfo, nftCollection]);
  return (
    <div className={styles['wrapper']}>
      {userInfo && (
        <div>
          <div className={styles['img-cover']}>
            <img src={userInfo.cover || undefined} />
            {/*<img src="https://uploads-ssl.webflow.com/623b48aca4d6403c00f8c106/6284bd3414beabc8c536453d_EINSTEIN-BLAZE-Background-Image.jpg" />*/}
          </div>
          <main>
            <div className={styles['container']}>
              <div className={styles['img-icon']}>
                <img src={userInfo.icon || undefined} />
                {/*<img src="https://uploads-ssl.webflow.com/623b48aca4d6403c00f8c106/63579d4a0b897b5b3958f2f8_tubby%20cats.png" />*/}
              </div>
              <div className={styles['container-left']}>
                <div className={styles['name']}>{userInfo.name}</div>
                <div className={styles['description']}>
                  {userInfo.description}
                </div>
              </div>
              <div className={styles['container-right']}>
                <div className={styles['socials']}>
                  <a
                    className={styles.twitter}
                    href={'https://twitter.com/' + (userInfo?.twitter || '')}
                    target="_blank"
                  >
                    <img className={styles.image} src={ProfileTwitterSvg} />
                  </a>
                  <a
                    className={styles.instagram}
                    href={
                      'https://www.instagram.com/' + (userInfo?.instagram || '')
                    }
                    target="_blank"
                  >
                    <img className={styles.image} src={ProfileInstagramSvg} />
                  </a>
                  <a
                    className={styles.website}
                    href={userInfo?.website}
                    target="_blank"
                  >
                    <img className={styles.image} src={ProfileWebsiteSvg} />
                  </a>
                  <a
                    className={styles.etherscan}
                    href={
                      'https://etherscan.io/address/' +
                      (userInfo?.address || '')
                    }
                    target="_blank"
                  >
                    <img className={styles.image} src={ProfileEtherscanSvg} />
                  </a>
                </div>
                <div className={styles['edit-button']}>
                  <button onClick={() => navigate('/profile/edit')}>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </main>
          {ownedNfts.length ? (
            <main>
              <div className={styles['collected']}>
                <div className={styles['cntents-label']}>Collected</div>
                <div className={styles['nft-list']}>
                  {ownedNfts.map((nft) => (
                    <NftCardById key={nft.metadata.id} {...nft} />
                  ))}
                </div>
              </div>
            </main>
          ) : null}
          <br />
          {userInfo?.creator && (
            <main>
              <div className={styles['created']}>
                <div className={styles['cntents-label']}>Created</div>
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
