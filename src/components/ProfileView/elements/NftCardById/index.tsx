import { useEffect, useState } from 'react';
import { NFT } from '@thirdweb-dev/sdk';
import { NftEntity } from 'src/utils/data';
import { getNft } from 'src/api';
import { NftCard } from 'src/components/NftCard';
import styles from './styles/nft-card-by-id.module.css';

enum Status {
  neutral,
  loading,
}

const getNftIdByNft = (nft: NFT) => {
  const attribute = (
    nft.metadata.attributes as {
      trait_type: string;
      value: any;
    }[]
  )?.find((x) => x.trait_type === 'uid');
  if (attribute) {
    const nftId = Number(String(attribute.value).split('#')[0]);
    return nftId;
  } else {
    return -1;
  }
};

export const NftCardById: React.FC<NFT> = (props) => {
  const [status, setStatus] = useState<Status>(Status.neutral);
  const [entity, setEntity] = useState<NftEntity | null>(null);
  useEffect(() => {
    if (!entity && status === Status.neutral) {
      const nftId = getNftIdByNft(props);
      if (nftId !== -1) {
        setStatus(Status.loading);
        void getNft(nftId).then((res) => {
          setEntity(res);
          setStatus(Status.neutral);
        });
      }
    }
  }, [entity, props, status]);
  return entity ? <NftCard {...entity} /> : null;
};
