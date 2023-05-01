import React, { useEffect, useState } from 'react';
import { getAllMetadatas } from 'src/api';
import { MetadataEntity } from 'src/utils/data';
import { NftCard } from './elements/NftCard';
import styles from './styles/nft-list.module.css';

export const NftList: React.FC = () => {
  const [metadatas, setMetadatas] = useState<MetadataEntity[] | null>(null);
  useEffect(() => {
    if (metadatas) return;
    setMetadatas([]);
    void getAllMetadatas().then((metadatas) => {
      setMetadatas(metadatas);
    });
  }, [metadatas]);
  return (
    <div className={styles['wrapper']}>
      {metadatas &&
        metadatas.map((metadata, i) => <NftCard key={i} {...metadata} />)}
    </div>
  );
};
