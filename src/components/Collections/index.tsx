import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { Nft } from 'src/utils/alchemy';
import { getCollectionNfts } from 'src/utils/mystudio-api';
import styles from './styles/collections.module.css';
import { NftCard } from '../NftCard';
import { NftEntity } from 'src/utils/data';

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
      // [TODO]
      // const _address =
      //   '0xccA4Ba7Eb2181c03Ed041C76f9F815F16E8aF5E1'.toLowerCase();
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
  return (
    <div className={styles['wrapper']}>
      <div className={styles['collected']}>
        <div className={styles['cntents-label']}>My Collections</div>
        <div className={styles['nft-list']}>
          {nfts
            .map((e) => {
              const id: NftEntity['id'] = `${e.contract.address.toLowerCase()}/${
                e.id.tokenId
              }`;
              const metadata: NftEntity['metadata'] =
                e.metadata as NftEntity['metadata'];
              const creator: NftEntity['creator'] = {
                address: '',
                admin: false,
                creator: true,
                name: '',
              };
              const supply: NftEntity['supply'] = {
                id: -1,
                price: -1,
                amount: -1,
                createdAt: '',
                updatedAt: '',
              };
              const createdAt = '';
              const updatedAt = '';
              return { id, metadata, creator, supply, createdAt, updatedAt };
            })
            .map((e, i) => (
              <NftCard key={i} {...e} />
            ))}
        </div>
      </div>
    </div>
  );
};
