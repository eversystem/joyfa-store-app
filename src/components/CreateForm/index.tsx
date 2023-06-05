import { useEffect, useState } from 'react';
import { useSDK, useAddress } from '@thirdweb-dev/react';
import { isCreatorAddress, listing } from 'src/api';
import { TextInput } from './elements/TextInput';
import { FileInput } from './elements/FileInput';
import styles from './styles/create-form.module.css';
import { TextareaInput } from './elements/TextareaInput';

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
  const [price, setPrice] = useState('0');
  const [supply, setSupply] = useState('1');

  useEffect(() => {
    if (address) {
      void isCreatorAddress(address).then((res) => {
        console.log(res);
        setIsCretor(res);
      });
    }
  }, [address]);

  const mintable =
    status === 'input' &&
    !!name &&
    !!description &&
    !!image &&
    !!animation &&
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
      if (status !== 'input') {
        throw new Error('invalid_status');
      }
      console.log('submit');
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
      const [_image, _animation_url, _glb_l, _glb_r] =
        await sdk.storage.uploadBatch([image, animation, glbL, glbR]);
      console.log('listing');
      const metadata = {
        creator: address,
        name,
        description,
        image: _image,
        animation_url: _animation_url,
        glb_r: _glb_r,
        glb_l: _glb_l,
        price: Number(price),
        supply: Number(supply),
      };
      const signer = sdk.getSigner();
      if (!signer) {
        throw new Error('signer not found');
      }
      const signature = await signer.signMessage(JSON.stringify(metadata));
      if (!signature) {
        throw new Error('sign rejected');
      }
      await listing({
        ...metadata,
        signature,
      });
      setStatus('completed');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['title']}>CREATE</div>
      {isCreator && (
        <div>
          <div className={styles['form-row']}>
            <div className={styles['name-and-description']}>
              {/* name */}
              <TextInput
                type="text"
                label="Name"
                name="name"
                value={name}
                setValue={setName}
                disabled={status !== 'input'}
              />
              {/* description */}
              <TextareaInput
                label="Description"
                name="description"
                value={description}
                setValue={setDescription}
                disabled={status !== 'input'}
              />
            </div>
            {/* image */}
            <div className={styles['image-uploader']}>
              <FileInput
                label="Image"
                name="image"
                value={image}
                setValue={setImage}
                disabled={status !== 'input'}
              />
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['animation-and-glbs-uploader']}>
              {/* animation */}
              <FileInput
                label="Video"
                name="animation_url"
                value={animation}
                setValue={setAnimation}
                disabled={status !== 'input'}
              />
              {/* glb_l */}
              <FileInput
                label="GLB Left"
                name="glb_l"
                value={glbL}
                setValue={setGLBL}
                disabled={status !== 'input'}
              />
              {/* gln_r */}
              <FileInput
                label="GLB Right"
                name="glb_r"
                value={glbR}
                setValue={setGLBR}
                disabled={status !== 'input'}
              />
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['price-and-supply']}>
              {/* price */}
              <TextInput
                type="number"
                label="Price"
                name="price"
                value={price}
                setValue={(value) => {
                  // validate
                  if (!Number.isNaN(value) && 0 < Number(value)) {
                    setPrice(Number(value).toString());
                  }
                }}
                disabled={status !== 'input'}
              />
              {/* supply */}
              <TextInput
                type="number"
                label="Supply"
                name="supply"
                value={supply}
                setValue={(value) => {
                  // validate
                  console.log(value);
                  if (Number.isInteger(Number(value)) && 0 < Number(value)) {
                    setSupply(Number(value).toString());
                  }
                }}
                disabled={status !== 'input'}
              />
            </div>
          </div>
          <div className={styles['form-row']}>
            <button
              className={`${styles['button']} ${
                clearable
                  ? styles['button-available']
                  : styles['button-disabled']
              }`}
              onClick={onClear}
              disabled={!clearable}
            >
              CLEAR
              {/* <a className={styles['button-text']}>CLEAR</a> */}
            </button>
            <button
              className={`${styles['button']} ${
                mintable
                  ? styles['button-available']
                  : styles['button-disabled']
              }`}
              onClick={onSubmit}
              disabled={!mintable}
            >
              CREATE
              {/* <a className={styles['button-text']}>CREATE</a> */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
