import { useState } from 'react';
import { useSDK, useAddress } from '@thirdweb-dev/react';
import { listing } from 'src/api';
import { TextInput } from './elements/TextInput';
import { FileInput } from './elements/FileInput';
import styles from './styles/create-form.module.css';

export const CreateForm: React.FC = () => {
  const sdk = useSDK();
  const address = useAddress();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [animation, setAnimation] = useState<File | null>(null);
  const [glbL, setGLBL] = useState<File | null>(null);
  const [glbR, setGLBR] = useState<File | null>(null);
  const [price, setPrice] = useState('0');
  const [supply, setSupply] = useState('1');

  const onSubmit = async () => {
    console.log('submit');
    if (!address) return;
    if (!sdk) return;
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
    const res = await listing({
      ...metadata,
      signature,
    });
    console.log(res);
  };

  return (
    <div className={styles['wrapper']}>
      <div className={styles['form-row']}>
        {/* name */}
        <TextInput label="Name" name="name" value={name} setValue={setName} />
        {/* description */}
        <TextInput
          label="Description"
          name="description"
          value={description}
          setValue={setDescription}
        />
        {/* image */}
        <FileInput
          label="Upload Image"
          name="image"
          value={image}
          setValue={setImage}
        />
      </div>
      <div className={styles['form-row']}>
        {/* animation */}
        <FileInput
          label="Animation URL"
          name="animation_url"
          value={animation}
          setValue={setAnimation}
        />
        {/* glb_l */}
        <FileInput label="GLB_L" name="glb_l" value={glbL} setValue={setGLBL} />
        {/* gln_r */}
        <FileInput label="GLB_R" name="glb_r" value={glbR} setValue={setGLBR} />
      </div>
      <div className={styles['form-row']}>
        {/* price */}
        <TextInput
          label="Price"
          name="price"
          value={price}
          setValue={setPrice}
        />
        {/* supply */}
        <TextInput
          label="Supply"
          name="supply"
          value={supply}
          setValue={setSupply}
        />
      </div>
      <button onClick={onSubmit}>submit</button>
    </div>
  );
};
