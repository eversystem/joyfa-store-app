import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { Nft } from 'src/utils/alchemy';
import { getCollectionNfts, getOwnedNftMetadata } from 'src/utils/mystudio-api';
import styles from './styles/collections.module.css';
import { NftCard } from '../NftCard';
import { NftEntity } from 'src/utils/data';
import { getNft } from 'src/api';

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
  const [nftEntities, setNftEntities] = useState<NftEntity[]>([]);
  useEffect(() => {
    if (status === CollectionsStatus.init && address) {
      setStatus(CollectionsStatus.loading);
      // [TODO]
      const _address =
        '0xccA4Ba7Eb2181c03Ed041C76f9F815F16E8aF5E1'.toLowerCase();
      void getCollectionNfts(_address)
        .then((res) => {
          setNfts(res.data.ownedNfts);
          setStatus(CollectionsStatus.success);
          const nfts = res.data.ownedNfts;
          const convertNftData = async () => {
            const nftEntities: NftEntity[] = [];
            const getNftEntity = async (i: number) => {
              const e = nfts[i];
              const creatorAttr =
                e.metadata &&
                e.metadata.attributes &&
                e.metadata.attributes.find((e) => e.trait_type === 'creator');
              console.log(creatorAttr);
              const id: NftEntity['id'] = `${e.contract.address.toLowerCase()}/${
                e.id.tokenId
              }`;
              if (e.metadata && e.metadata.attributes && creatorAttr) {
                const idAttr = e.metadata.attributes.find(
                  (e) => e.trait_type === 'uid',
                );
                // Drops
                if (idAttr) {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                  const entityId = idAttr.value.split('#')[0];
                  const metadata = await getNft(Number(entityId));
                  metadata.id = id;
                  return metadata;
                }
              }
              // それ以外
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
            };
            for (let i = 0; i < nfts.length; i++) {
              const entity = await getNftEntity(i);
              nftEntities.push(entity);
            }
            setNftEntities(nftEntities);
          };
          void convertNftData();
        })
        .catch(() => {
          setStatus(CollectionsStatus.error);
        });
    }
  }, [address, status]);
  console.log(nfts);
  console.log(nftEntities);
  return (
    <div className={styles['']}>
      <div className={styles['collected']}>
        <div className={styles['contents-label']}>My Collections</div>
        <div className={styles['wrapper']}>
          {nftEntities.map((e, i) => (
            <NftCard key={i} {...e} />
          ))}
          {/* {nfts
            .map((e) => {
              // それ以外
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
            ))} */}
        </div>
      </div>
    </div>
  );
};
