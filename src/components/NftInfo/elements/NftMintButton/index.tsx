import { useContract, useAddress } from '@thirdweb-dev/react';
import { mint } from 'src/api';
import { NftEntity } from 'src/utils/data';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import styles from './styles/nft-mint-button.module.css';

// export enum NftMintStatus {
//   loading,
//   mintable,
//   minted,
// }

export type AvailableNftProps = {
  nft: NftEntity;
  mintable?: boolean;
  // status: NftMintStatus;
};

export const NftMintButton: React.FC<AvailableNftProps> = (props) => {
  const { nft, mintable } = props;
  const address = useAddress();
  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );

  const onMint = async () => {
    console.log('mint-button-clicked');
    if (!address) return;
    console.log('mint');
    const res = await mint(nft.uid, address);
    console.log(res.data);
    await nftCollection?.signature.mint(res.data);
  };

  return (
    <button
      disabled={!mintable}
      className={`${styles['button']} ${
        mintable ? styles['available'] : styles['disable']
      }`}
      onClick={onMint}
    >
      #{nft.sequence}
    </button>
  );
};
