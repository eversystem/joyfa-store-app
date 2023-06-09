import { UserEntity } from 'src/utils/data';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile-edit.module.css';
import { useAddress, useContract } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { getUserInfo } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { FileInput } from './elements/FileInput';
import { TextareaInput } from './elements/TextareaInput';
import { TextInput } from './elements/TextInput';

export const ProfileEdit: React.FC = () => {
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [icon, setIcon] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

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
      });
      void getUserInfo(currentAddress).then((user) => {
        console.log('user-info');
        console.log(user);
        if (user) {
          setUserInfo(user);
          setName(user.name);
          setDescription(user.description || '');
          setTwitter(user.twitter || '');
          setInstagram(user.instagram || '');
          setWebsite(user.website || '');
        }
      });
    }
  }, [address, currentAddress, userInfo, nftCollection]);
  return (
    <div className={styles['']}>
      <div>Profile Edit</div>
      <div>
        The ambassador program is an important step in becoming a community
        empowered and curated platform.
      </div>
      {userInfo && (
        <div>
          <button
            className={styles['back-btn']}
            onClick={() => navigate('/profile')}
          >
            back
          </button>
          <div className={styles['address']}>Address: {address}</div>
          <div className={styles['img-cover']}>
            <img src={userInfo.cover || undefined} />
          </div>
          <FileInput
            label={'Cover'}
            name={'cover'}
            value={cover}
            setValue={(file: File | null) => {
              setCover(file);
            }}
          />
          <div className={styles['img-icon']}>
            <img src={userInfo.icon || undefined} />
          </div>
          <FileInput
            label={'Icon'}
            name={'icon'}
            value={icon}
            setValue={(file: File | null) => {
              setIcon(file);
            }}
          />
          <div className={styles['name']}>
            <TextInput
              label={'Name'}
              name={'name'}
              value={name}
              type={'text'}
              setValue={(value: string) => {
                setName(value);
              }}
            />
          </div>
          <div className={styles['description']}>
            <TextareaInput
              label={'Description'}
              name={'description'}
              value={description}
              setValue={(value: string) => {
                setDescription(value);
              }}
            />
          </div>
          <div className={styles['socials']}>
            <div className={styles['twitter']}>
              <TextInput
                label={'Twitter'}
                name={'twitter'}
                value={twitter}
                type={'text'}
                setValue={(value: string) => {
                  setTwitter(value);
                }}
              />
            </div>
            <div className={styles['instagram']}>
              <TextInput
                label={'Instagram'}
                name={'instagram'}
                value={instagram}
                type={'text'}
                setValue={(value: string) => {
                  setInstagram(value);
                }}
              />
            </div>
            <div className={styles['website']}>
              <TextInput
                label={'Website'}
                name={'website'}
                value={website}
                type={'text'}
                setValue={(value: string) => {
                  setWebsite(value);
                }}
              />
            </div>
          </div>
        </div>
      )}
      <button
        className={styles['update-btn']}
        onClick={() => navigate('/profile')}
      >
        update
      </button>
    </div>
  );
};
