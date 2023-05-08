import { useContract, useAddress } from '@thirdweb-dev/react';
import { mint } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import styles from './styles/nft-mint-button.module.css';

export type NftMintStatus = 'loading' | 'mintable' | 'minted';

export type AvailableNftProps = {
  nft_id: number;
  token_id: number;
  status: NftMintStatus;
};

export const NftMintButton: React.FC<AvailableNftProps> = (props) => {
  const { nft_id, token_id, status } = props;
  const address = useAddress();
  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );

  const onMint = async () => {
    console.log('mint-button-clicked');
    if (!address) return;
    console.log('mint');
    const res = await mint(nft_id, token_id, address);
    await nftCollection?.signature.mint(res.data);
  };

  return (
    <button
      disabled={status !== 'mintable'}
      className={`${styles['button']} ${
        status === 'mintable' ? styles['available'] : styles['disable']
      }`}
      onClick={onMint}
    >
      #{token_id}
    </button>
  );
};
