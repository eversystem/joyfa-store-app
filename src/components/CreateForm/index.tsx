import { useEffect, useState } from 'react';
import { useSDK, useAddress } from '@thirdweb-dev/react';
import { isCreatorAddress, listing, signin } from 'src/api';
import { TextInput } from './elements/TextInput';
import { FileInput } from './elements/FileInput';
import styles from './styles/create-form.module.css';
import { TextareaInput } from './elements/TextareaInput';
import { ListingRequest } from 'src/utils/data';

type ListingStatus = 'input' | 'loading' | 'completed' | 'error';

export const CreateForm: React.FC = () => {
  const sdk = useSDK();
  const address = useAddress();
  const [isCreator, setIsCretor] = useState<boolean>(false);
  const [status, setStatus] = useState<ListingStatus>('input');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [animation, setAnimation] = useState<File | null>(null);
  const [glbL, setGLBL] = useState<File | null>(null);
  const [glbR, setGLBR] = useState<File | null>(null);
  const [price, setPrice] = useState('0.1');
  const [supply, setSupply] = useState('1');

  useEffect(() => {
    if (address) {
      void isCreatorAddress(address).then((res) => {
        console.log(res);
        setIsCretor(res);
      });
    }
  }, [address]);

  const creatable =
    status === 'input' &&
    !!name &&
    !!description &&
    !!image &&
    // !!animation &&
    !!glbL &&
    !!glbR;
  const clearable = status !== 'loading';

  const onClear = () => {
    setStatus('input');
    setName('');
    setDescription('');
    setImage(null);
    setAnimation(null);
    setGLBL(null);
    setGLBR(null);
    setPrice('0');
    setSupply('1');
  };

  const onSubmit = async () => {
    try {
      console.log('submit');
      // if (status !== 'input') {
      //   throw new Error('invalid_status');
      // }
      if (!creatable) {
        console.log('fill all required form');
        return;
      }
      setStatus('loading');
      if (!address) {
        throw new Error('wallet_not_connected');
      }
      if (!sdk) {
        throw new Error('sdk_not_connected');
      }
      if (!(image && animation && glbL && glbR)) {
        throw new Error('file_not_found');
      }
      console.log('upload_file');
      const metadata: ListingRequest = {
        // creator: address,
        name,
        description,
        image: '',
        // animation_url: _animation_url,
        glb_l: '',
        glb_r: '',
        price: Number(price),
        supply: Number(supply),
      };
      const [_image, _animation_url, _glb_l, _glb_r] = await Promise.all([
        sdk.storage.upload(image),
        animation
          ? sdk.storage.upload(animation)
          : new Promise<null>((resolve) => resolve(null)),
        sdk.storage.upload(glbL),
        sdk.storage.upload(glbR),
      ]);
      metadata.image = _image;
      if (_animation_url) {
        metadata.animation_url = _animation_url;
      }
      metadata.glb_l = _glb_l;
      metadata.glb_r = _glb_r;
      // if (animation) {
      //   const [_image, _animation_url, _glb_l, _glb_r] =
      //     await sdk.storage.uploadBatch([image, animation, glbL, glbR]);
      // } else {
      //   const [_image, _glb_l, _glb_r] = await sdk.storage.uploadBatch([
      //     image,
      //     glbL,
      //     glbR,
      //   ]);
      // }
      console.log(JSON.stringify(metadata, null, 2));
      console.log('listing');
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
      await listing(jwt, { ...metadata });
      setStatus('completed');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>CREATE</div>
      <div className={styles['message']}>*required</div>
      {isCreator && (
        <div>
          <div className={styles['form-left']}>
            <div className={styles['form-row']}>
              <div className={styles['name-and-description']}>
                {/* name */}
                <TextInput
                  type="text"
                  label="Name*"
                  name="name"
                  value={name}
                  setValue={setName}
                  disabled={status !== 'input'}
                />
                {/* description */}
                <TextareaInput
                  label="Story*"
                  name="description"
                  value={description}
                  setValue={setDescription}
                  disabled={status !== 'input'}
                />
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles['price-and-supply']}>
                {/* price */}
                <TextInput
                  type="number"
                  label="Price per copy*"
                  name="price"
                  value={price}
                  setValue={(value) => {
                    // validate
                    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
                      setPrice(Number(value).toString());
                    }
                    // if (!Number.isNaN(value) && 0 < Number(value)) {
                    //   setPrice(Number(value).toString());
                    // }
                  }}
                  suffix="&nbsp;ETH"
                  disabled={status !== 'input'}
                />
                {/* supply */}
                <TextInput
                  type="number"
                  label="Supply (max: 100)*"
                  name="supply"
                  value={supply}
                  setValue={(value) => {
                    // validate
                    // if (Number.isInteger(Number(value)) && 0 < Number(value)) {
                    //   setSupply(Number(value).toString());
                    // }
                    // setSupply(Number(value).toString());
                    if (/^[1-9][0-9]*$/.test(value)) {
                      if (Number(value) <= 100) {
                        setSupply(Number(value).toString());
                      }
                    }
                    // if (!Number.isNaN(value) && 0 < Number(value)) {
                    //   setSupply(Number(value).toString());
                    // }
                  }}
                  disabled={status !== 'input'}
                />
              </div>
            </div>
          </div>
          <div className={styles['form-right']}>
            {/* image */}
            <div className={styles['image-uploader']}>
              <FileInput
                label="Image (max: 100mb)*"
                name="image"
                value={image}
                setValue={(value) => {
                  // 100MB = 104857600 Byte
                  if (value && value.size < 104857600) {
                    setImage(value);
                  }
                }}
                disabled={status !== 'input'}
              />
            </div>
            {/* animation */}
            <FileInput
              label="Video (max: 100mb)"
              name="animation_url"
              value={animation}
              setValue={(value) => {
                // 100MB = 104857600 Byte
                if (value && value.size < 104857600) {
                  setAnimation(value);
                }
              }}
              disabled={status !== 'input'}
            />
            {/* glb_l */}
            <FileInput
              label="GLB Left (max: 30mb)*"
              name="glb_l"
              value={glbL}
              // setValue={setGLBL}
              setValue={(value) => {
                // 100MB = 31457280 Byte
                if (value && value.size < 31457280) {
                  setGLBL(value);
                }
              }}
              disabled={status !== 'input'}
            />
            {/* gln_r */}
            <FileInput
              label="GLB Right (max: 30mb)*"
              name="glb_r"
              value={glbR}
              // setValue={setGLBR}
              setValue={(value) => {
                // 100MB = 31457280 Byte
                if (value && value.size < 31457280) {
                  setGLBR(value);
                }
              }}
              disabled={status !== 'input'}
            />
          </div>
          <div className={styles['form-row']}>
            <div className={styles['button-box']}>
              <button
                // className={`${styles['button']} ${
                //   mintable
                //     ? styles['button-available']
                //     : styles['button-disabled']
                // }`}
                className={`${styles['button']} ${styles['button-available']}`}
                onClick={onSubmit}
                // disabled={!mintable}
              >
                CREATE
                {/* <a className={styles['button-text']}>CREATE</a> */}
              </button>
            </div>
          </div>
          <div className={styles['status']}>
            {status === 'loading'
              ? 'Loading'
              : status === 'completed'
              ? 'Your NFT has been created!'
              : ''}
          </div>
        </div>
      )}
    </div>
  );
};
