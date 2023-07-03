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
  const [error, setError] = useState('');

  useEffect(() => {
    if (address) {
      void isCreatorAddress(address).then((res) => {
        console.log(res);
        setIsCretor(res);
      });
    }
  }, [address]);

  // const creatable =
  //   status === 'input' &&
  //   !!name &&
  //   !!description &&
  //   !!image &&
  //   !!glbL &&
  //   !!glbR;
  // const clearable = status !== 'loading';

  // const onClear = () => {
  //   setStatus('input');
  //   setName('');
  //   setDescription('');
  //   setImage(null);
  //   setAnimation(null);
  //   setGLBL(null);
  //   setGLBR(null);
  //   setPrice('0');
  //   setSupply('1');
  // };

  const onSubmit = async () => {
    try {
      console.log('submit');
      // if (!creatable) {
      //   console.log(status);
      //   console.log(name);
      //   console.log(description);
      //   console.log(image);
      //   console.log(glbL);
      //   console.log(glbR);
      //   console.log('fill all required form');
      //   return;
      // }
      if (!address) {
        const message = 'Please connect wallet.';
        setError(message);
        throw new Error(message);
      }
      if (!sdk) {
        throw new Error('sdk_not_connected');
      }
      const signer = sdk.getSigner();
      if (!signer) {
        const message = 'Please connect wallet.';
        setError(message);
        throw new Error(message);
      }
      if (!(image && glbL && glbR)) {
        const message = 'Fill all required form.';
        setError(message);
        throw new Error(message);
      }
      // if (!Number.isInteger(price) || Number(price) <= 0) {
      if (Number(price) <= 0) {
        const message = 'The price needs to be greater than or equal to zero.';
        setError(message);
        throw new Error('message');
      }
      if (
        !Number.isInteger(Number(supply)) ||
        !(0 < Number(supply) && Number(supply) <= 100)
      ) {
        const message = 'The supply needs to be between 1 and 100.';
        setError(message);
        throw new Error(message);
      }
      setStatus('loading');
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
      console.log(JSON.stringify(metadata, null, 2));
      console.log('listing');
      const message = `Sign in to Drops. (${new Date().getTime().toString()})`;
      const signature = await signer.signMessage(message);
      if (!signature) {
        const message = 'Invalid signature.';
        setError(message);
        throw new Error(message);
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
                  setValue={(value) => {
                    setError('');
                    setStatus('input');
                    setName(value);
                  }}
                  disabled={status === 'loading'}
                />
                {/* description */}
                <TextareaInput
                  label="Story*"
                  name="description"
                  value={description}
                  setValue={(value) => {
                    setError('');
                    setStatus('input');
                    setDescription(value);
                  }}
                  disabled={status === 'loading'}
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
                    setError('');
                    setStatus('input');
                    setPrice(value.toString());
                  }}
                  suffix="&nbsp;ETH"
                  disabled={status === 'loading'}
                />
                {/* supply */}
                <TextInput
                  type="number"
                  label="Supply (max: 100)*"
                  name="supply"
                  value={supply}
                  setValue={(value) => {
                    setError('');
                    setStatus('input');
                    setSupply(value.toString());
                  }}
                  disabled={status === 'loading'}
                />
              </div>
            </div>
          </div>
          <div className={styles['form-right']}>
            {/* image */}
            <FileInput
              label="Image (max: 100mb)*"
              name="image"
              accept="image/png, image/jpeg, image/jpg"
              value={image}
              setValue={(value) => {
                // 100MB = 104857600 Byte
                if (value && value.size < 104857600) {
                  setError('');
                  setStatus('input');
                  setImage(value);
                }
              }}
              disabled={status === 'loading'}
            />
            {/* animation */}
            <FileInput
              label="Video (max: 100mb)"
              name="animation_url"
              accept="video/mp4"
              value={animation}
              setValue={(value) => {
                // 100MB = 104857600 Byte
                if (value && value.size < 104857600) {
                  setError('');
                  setStatus('input');
                  setAnimation(value);
                }
              }}
              disabled={status === 'loading'}
            />
            {/* glb_l */}
            <FileInput
              label="GLB Left (max: 30mb)*"
              name="glb_l"
              accept=".glb"
              value={glbL}
              // setValue={setGLBL}
              setValue={(value) => {
                // 100MB = 31457280 Byte
                if (value && value.size < 31457280) {
                  setError('');
                  setStatus('input');
                  setGLBL(value);
                }
              }}
              disabled={status === 'loading'}
            />
            {/* gln_r */}
            <FileInput
              label="GLB Right (max: 30mb)*"
              name="glb_r"
              accept=".glb"
              value={glbR}
              // setValue={setGLBR}
              setValue={(value) => {
                // 100MB = 31457280 Byte
                if (value && value.size < 31457280) {
                  setError('');
                  setStatus('input');
                  setGLBR(value);
                }
              }}
              disabled={status === 'loading'}
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
              : status === 'error'
              ? error
              : ''}
          </div>
        </div>
      )}
    </div>
  );
};
