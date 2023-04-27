import React, { useState } from 'react';
import { useSDK, useAddress } from '@thirdweb-dev/react';
import { listing } from 'src/api';
import { handleFile } from 'src/utils/hook';
import styles from './styles/listing-form.module.css';

export const ListingForm: React.FC = () => {
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
    const signature = await sdk.getSigner()?.signMessage(
      JSON.stringify({
        creator: address,
        name,
        description,
        image: _image,
        animation_url: _animation_url,
        glb_r: _glb_r,
        glb_l: _glb_l,
        price: Number(price),
        supply: Number(supply),
      }),
    );
    if (!signature) {
      throw new Error('sign rejected');
    }
    const res = await listing({
      creator: address,
      name,
      description,
      image: _image,
      animation_url: _animation_url,
      glb_r: _glb_r,
      glb_l: _glb_l,
      price: Number(price),
      supply: Number(supply),
      signature,
    });
    console.log(res);
  };
  return (
    <div className={styles['wrapper']}>
      <div className={styles['row']}>
        {/* name */}
        <div className={styles['input-text']}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>
        </div>
        {/* description */}
        <div className={styles['input-text']}>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </label>
        </div>
        {/* image */}
        <div className={styles['input-file']}>
          <label>
            Upload Image:
            <input type="file" name="image" onChange={handleFile(setImage)} />
          </label>
        </div>
      </div>
      <div className={styles['row']}>
        {/* animation */}
        <div className={styles['input-file']}>
          <label>
            Animation URL:
            <input
              type="file"
              name="animation_url"
              onChange={handleFile(setAnimation)}
            />
          </label>
        </div>
        {/* glb_l */}
        <div className={styles['input-file']}>
          <label>
            GLB_L:
            <input type="file" name="glb_l" onChange={handleFile(setGLBL)} />
          </label>
        </div>
        {/* gln_r */}
        <div className={styles['input-file']}>
          <label>
            GLB_R:
            <input type="file" name="glb_r" onChange={handleFile(setGLBR)} />
          </label>
        </div>
      </div>
      <div className="row">
        {/* price */}
        <div className={styles['input-text']}>
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </label>
        </div>
        {/* supply */}
        <div className={styles['input-text']}>
          <label>
            Supply:
            <input
              type="text"
              name="supply"
              value={supply}
              onChange={(e) => {
                setSupply(e.target.value);
              }}
            />
          </label>
        </div>
      </div>
      <button onClick={onSubmit}>submit</button>
    </div>
  );
};
