import React, { useEffect, useState } from 'react';
import { getAllNfts } from 'src/api';
import { NftEntity } from 'src/utils/data';
import { NftCard } from '../../../NftCard';
import styles from './styles/nft-list.module.css';

type NftListStatus = 'init' | 'loading' | 'fetched' | 'error';

type NFTCompareFn = (a: NftEntity, b: NftEntity) => number;

const compareNftsByDate: NFTCompareFn = (a, b) => {
  if (a && b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  } else {
    return 0;
  }
};

export const NftList: React.FC = () => {
  const [status, setStatus] = useState<NftListStatus>('init');
  const [nfts, setNfts] = useState<NftEntity[] | null>(null);
  useEffect(() => {
    if (status !== 'init') return;
    setStatus('loading');
    void getAllNfts()
      .then((nfts) => {
        setStatus('fetched');
        setNfts(nfts);
      })
      .catch(() => {
        setStatus('error');
      });
  }, [status]);
  return (
    <div className={styles['wrapper']}>
      {nfts &&
        [...nfts]
          .sort(compareNftsByDate)
          .map((nft, i) => <NftCard key={i} {...nft} />)}
    </div>
  );
};
