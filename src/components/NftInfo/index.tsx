import { NftDetails } from './elements/NftDetails';
import { NftMintButton } from './elements/NftMintButton';
import { NftEntity } from 'src/utils/data';
import styles from './styles/nft-info.module.css';
import { NFT, useContract } from '@thirdweb-dev/react';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { useEffect, useState } from 'react';

export type NftInfoProps = {
  nfts: NftEntity[];
};

export const NftInfo: React.FC<NftInfoProps> = (props) => {
  const { nfts } = props;
  const [mintedNfts, setMintedNfts] = useState<NFT[]>([]);
  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );
  useEffect(() => {
    if (nftCollection) {
      void nftCollection.getAll().then((res) => {
        setMintedNfts(res);
      });
    }
  }, [nftCollection]);
  const isMintable = (nft: NftEntity) => {
    const mintedNftHasSameExternalUrl = mintedNfts.filter(
      (mintedNft) =>
        mintedNft.metadata.external_url ===
        `https://store.joyfa.io/nft/${nft.metadata.id}`,
    );
    const mintedNftHasSameId = mintedNftHasSameExternalUrl.filter(
      (mintedNft) => {
        const attribute = (
          mintedNft.metadata.attributes as { trait_type: string; value: any }[]
        ).find((attr) => attr.trait_type === 'id');
        return attribute?.value === nft.sequence;
      },
    );
    return mintedNftHasSameId.length === 0;
  };
  return (
    <div className={styles['nft-info']}>
      {!!nfts.length && (
        <>
          <NftDetails {...nfts[0].metadata} />
          <div className={styles['available-ids']}>Available IDs</div>
          {nfts.map((nft) => (
            <NftMintButton
              key={nft.sequence}
              nft={nft}
              mintable={isMintable(nft)}
            />
          ))}
        </>
      )}
    </div>
  );
};
