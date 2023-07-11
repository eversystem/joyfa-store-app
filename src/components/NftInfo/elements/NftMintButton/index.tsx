import {
  useContract,
  useAddress,
  useNetworkMismatch,
} from '@thirdweb-dev/react';
import { mint } from 'src/api';
import { NETWORK, NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import styles from './styles/nft-mint-button.module.css';
// import { useState } from 'react';

export type NftMintStatus = 'loading' | 'mintable' | 'minted';
export type NftMintingStatus = 'loading' | 'available' | 'minted';

export type AvailableNftProps = {
  nft_id: number;
  token_id: number;
  status: NftMintStatus;
  mintingStatus: NftMintingStatus;
  setMintingStatus: (status: NftMintingStatus) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
};

export const NftMintButton: React.FC<AvailableNftProps> = (props) => {
  const { nft_id, token_id, status, setMintingStatus, setErrorMessage } = props;
  const address = useAddress();
  const isMismatch = useNetworkMismatch();

  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );

  const onMint = async () => {
    console.log('mint-button-clicked');
    if (!address) {
      setErrorMessage('Please connect your wallet.');
    } else {
      if (isMismatch) {
        setErrorMessage(`Please connect your wallet to ${NETWORK} network.`);
      }
      console.log('mint');
      setMintingStatus('loading');
      setErrorMessage('');
      try {
        const res = await mint(nft_id, token_id, address);
        await nftCollection?.signature.mint(res.data);
        setMintingStatus('minted');
      } catch (error) {
        // const { message } = error as { message: string };
        // console.log('ERROR->');
        // console.log(message);
        // console.log('>-ERROR');
        // setErrorMessage(message);
        setErrorMessage('We were unable to send the transaction.');
        setMintingStatus('available');
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
