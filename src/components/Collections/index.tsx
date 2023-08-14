import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { Nft } from 'src/utils/alchemy';
import { getCollectionNfts, getRequestedNfts } from 'src/utils/mystudio-api';
import styles from './styles/collections.module.css';

enum CollectionsStatus {
  init,
  loading,
  success,
  error,
}

export const Collections: React.FC = () => {
  const address = useAddress();
  const [status, setStatus] = useState<CollectionsStatus>(
    CollectionsStatus.init,
  );
  const [nfts, setNfts] = useState<Nft[]>([]);
  useEffect(() => {
    if (status === CollectionsStatus.init && address) {
      setStatus(CollectionsStatus.loading);
      void getCollectionNfts(address)
        .then((res) => {
          setNfts(res.data.ownedNfts);
          setStatus(CollectionsStatus.success);
        })
        .catch(() => {
          setStatus(CollectionsStatus.error);
        });
    }
  }, [address, status]);
  console.log(nfts);
  return null;
};
