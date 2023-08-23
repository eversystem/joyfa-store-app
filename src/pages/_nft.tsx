import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
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
import { getOwnedNftMetadata } from 'src/utils/mystudio-api';

type NftPageStatus = 'init' | 'loading' | 'fetched' | 'error';

export const NftPage: React.FC = () => {
  const [status, setStatus] = useState<NftPageStatus>('init');
  const [nft, setNft] = useState<NftEntity | null>(null);
  const { contract, id } = useParams();
  const address = useAddress();
  useEffect(() => {
    if (status !== 'init') return;
    if (contract && id) {
      if (address) {
        console.log('fetch');
        // [TODO]
        // const _address =
        //   '0xccA4Ba7Eb2181c03Ed041C76f9F815F16E8aF5E1'.toLowerCase();
        setStatus('loading');
        void getOwnedNftMetadata(address, contract, id)
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
      }
    } else {
      setStatus('loading');
      void getNft(Number(id))
        .then((nft) => {
          setStatus('fetched');
          setNft(nft);
        })
        .catch(() => {
          setStatus('error');
        });
    }
  }, [address, contract, id, status]);
  return (
    <>
      <Header />
      <main>{nft && <NftInfo nft={nft} />}</main>
      <Footer />
    </>
  );
};
