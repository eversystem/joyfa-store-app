import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from 'src/components/Header';
import { NftInfo } from 'src/components/NftInfo';
import { getNftsByMetadataId } from 'src/api';
import { NftEntity } from 'src/utils/data';

export const Nft: React.FC = () => {
  const [nfts, setNfts] = useState<NftEntity[] | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (!nfts) {
      setNfts([]);
      void getNftsByMetadataId(Number(id)).then((nfts) => {
        setNfts(nfts);
      });
    }
  }, [nfts, id]);
  return (
    <>
      <Header />
      <main>{nfts && <NftInfo nfts={nfts} />}</main>
    </>
  );
};
