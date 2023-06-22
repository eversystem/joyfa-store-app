import { UserEntity } from 'src/utils/data';
import { useNavigate } from 'react-router-dom';
import styles from './styles/profile-edit.module.css';
import { useAddress, useContract, useSDK } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import { getUserInfo, signin } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { FileInput } from './elements/FileInput';
import { TextareaInput } from './elements/TextareaInput';
import { TextInput } from './elements/TextInput';
import {
  updateUserProfile,
  UserEntityUpdatableBySelf,
} from 'src/api/update-user-profile';

export enum Status {
  edit,
  loading,
  success,
  error,
}

export const ProfileEdit: React.FC = () => {
  const sdk = useSDK();
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
  const [status, setStatus] = useState<Status>(Status.edit);

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
  const update = async () => {
    if (userInfo && sdk && address) {
      const signer = sdk.getSigner();
      if (!signer) {
        throw new Error('signer not found');
      }
      const message = `Sign in to Drops. (${new Date().getTime().toString()})`;
      const signature = await signer.signMessage(message);
      if (!signature) {
        throw new Error('sign rejected');
      }
      const jwt = await signin(
        address.toLowerCase(),
        `${message}:${signature}`,
      );
      const updateData: UserEntityUpdatableBySelf = {};
      if (userInfo.name !== name) updateData.name = name;
      if (userInfo.description !== description)
        updateData.description = description;
      if (userInfo.twitter !== twitter) updateData.twitter = twitter;
      if (userInfo.instagram !== instagram) updateData.instagram = instagram;
      if (userInfo.website !== website) updateData.website = website;
      if (icon) updateData.icon = icon;
      if (cover) updateData.cover = cover;
      try {
        setStatus(Status.loading);
        await updateUserProfile(jwt, updateData);
        setStatus(Status.success);
        // const user = await getUserInfo(address);
        // setUserInfo(user);
        // setName(user.name);
        // setDescription(user.description || '');
        // setTwitter(user.twitter || '');
        // setInstagram(user.instagram || '');
        // setWebsite(user.website || '');
      } catch (error) {
        setStatus(Status.error);
        // co
      }
    }
  };
  return (
    <div className={styles['']}>
      <div className={styles['title']}>Profile Edit</div>
      {userInfo && (
        <div>
          <div className={styles['left']}>
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
                <p className={styles['twitter-text']}>twitter.com/</p>
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
                <p className={styles['instagram-text']}>instagram.com/</p>
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
          <div className={styles['right']}>
            <FileInput
              label={'Cover (max: 30mb)'}
              name={'cover'}
              value={cover}
              setValue={(file: File | null) => {
                setCover(file);
              }}
            />
            <div className={styles['img-cover']}>
              <img src={userInfo.cover || undefined} />
            </div>
            <FileInput
              label={'Icon (max: 30mb)'}
              name={'icon'}
              value={icon}
              setValue={(file: File | null) => {
                setIcon(file);
              }}
            />
            <div className={styles['img-icon']}>
              <img src={userInfo.icon || undefined} />
            </div>
          </div>
          <div className={styles['clear']}></div>
        </div>
      )}
      <button
        className={styles['back-btn']}
        onClick={() => navigate('/profile')}
      >
        Cancel
      </button>
      <button className={styles['update-btn']} onClick={() => update()}>
        Update
      </button>
      <div className={styles['status']}>
        {status === Status.success
          ? 'Your profile has been updated!'
          : status === Status.loading
          ? 'Loading...'
          : ''}
      </div>
    </div>
  );
};
