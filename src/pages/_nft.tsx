import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from 'src/components/Header';
import { NftInfo } from 'src/components/NftInfo';
import { getNft } from 'src/api';
import { NftEntity } from 'src/utils/data';
import { Footer } from 'src/components/Footer';

type NftPageStatus = 'init' | 'loading' | 'fetched' | 'error';

export const Nft: React.FC = () => {
  const [status, setStatus] = useState<NftPageStatus>('init');
  const [nft, setNft] = useState<NftEntity | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (status !== 'init') return;
    setStatus('loading');
    void getNft(Number(id))
      .then((nft) => {
        setStatus('fetched');
        setNft(nft);
      })
      .catch(() => {
        setStatus('error');
      });
  }, [id, status]);
  return (
    <>
      <Header />
      <main>{nft && <NftInfo nft={nft} />}</main>
      <Footer />
    </>
  );
};
