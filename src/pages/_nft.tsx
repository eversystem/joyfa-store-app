import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from 'src/components/Header';
import { NftInfo } from 'src/components/NftInfo';
import { getNft } from 'src/api';
import {
  MetadataEntity,
  NftEntity,
  SupplyEntity,
  UserEntity,
} from 'src/utils/data';
import { Footer } from 'src/components/Footer';
import { getNftMetadata } from 'src/utils/mystudio-api';

type NftPageStatus = 'init' | 'loading' | 'fetched' | 'error';

export const NftPage: React.FC = () => {
  const [status, setStatus] = useState<NftPageStatus>('init');
  const [nft, setNft] = useState<NftEntity | null>(null);
  const { contract, id } = useParams();
  useEffect(() => {
    if (status !== 'init') return;
    setStatus('loading');
    if (contract && id) {
      void getNftMetadata(contract, id)
        .then((res) => res.data)
        .then((_nft) => {
          setStatus('fetched');
          console.log(_nft);
          const nft: NftEntity = {
            id: _nft.id.tokenId,
            metadata: _nft.metadata as MetadataEntity,
            creator: {} as UserEntity,
            supply: {} as SupplyEntity,
            createdAt: '',
            updatedAt: '',
          };
          setNft(nft);
        });
    } else {
      void getNft(Number(id))
        .then((nft) => {
          setStatus('fetched');
          setNft(nft);
        })
        .catch(() => {
          setStatus('error');
        });
    }
  }, [contract, id, status]);
  return (
    <>
      <Header />
      <main>{nft && <NftInfo nft={nft} />}</main>
      <Footer />
    </>
  );
};
