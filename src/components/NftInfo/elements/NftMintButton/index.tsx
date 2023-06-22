import { useContract, useAddress } from '@thirdweb-dev/react';
import { mint } from 'src/api';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import styles from './styles/nft-mint-button.module.css';
// import { useState } from 'react';

export type NftMintStatus = 'loading' | 'mintable' | 'minted';

export type AvailableNftProps = {
  nft_id: number;
  token_id: number;
  status: NftMintStatus;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

export const NftMintButton: React.FC<AvailableNftProps> = (props) => {
  const { nft_id, token_id, status, setErrorMessage } = props;
  const address = useAddress();

  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );

  const onMint = async () => {
    console.log('mint-button-clicked');
    if (!address) {
      setErrorMessage('please connect wallet');
    } else {
      console.log('mint');
      setErrorMessage('');
      try {
        const res = await mint(nft_id, token_id, address);
        await nftCollection?.signature.mint(res.data);
      } catch (error) {
        // const { message } = error as { message: string };
        // console.log('ERROR->');
        // console.log(message);
        // console.log('>-ERROR');
        // setErrorMessage(message);
        setErrorMessage('metamask failed to send tx');
      }
    }
  };

  return (
    <button
      disabled={status !== 'mintable'}
      className={`${styles['button']} ${
        status === 'mintable' ? styles['available'] : styles['disable']
      }`}
      onClick={onMint}
    >
      {token_id}
    </button>
  );
};
