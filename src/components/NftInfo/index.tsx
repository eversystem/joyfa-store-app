import { NftDetails } from './elements/NftDetails';
import { NftMintButton, NftMintingStatus } from './elements/NftMintButton';
import { NftEntity } from 'src/utils/data';
import styles from './styles/nft-info.module.css';
import { NFT, useContract } from '@thirdweb-dev/react';
import { NFT_COLLECTION_ADDRESS } from 'src/utils/env';
import { useEffect, useState } from 'react';

export type NftInfoProps = {
  nft: NftEntity;
};

type NftInfoStatus = 'init' | 'loading' | 'fetched';

export const NftInfo: React.FC<NftInfoProps> = (props) => {
  const { nft } = props;
  const [status, setStatus] = useState<NftInfoStatus>('init');
  const [mintedNfts, setMintedNfts] = useState<NFT[]>([]);
  const [tokenIdFilter, setTokenIdFilter] = useState(0);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [mintingStatus, setMintingStatus] =
    useState<NftMintingStatus>('available');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: nftCollection } = useContract(
    NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );

  useEffect(() => {
    if (nftCollection && status === 'init') {
      setStatus('loading');
      void nftCollection.getAll().then((res) => {
        setMintedNfts(res);
        setStatus('fetched');
      });
    }
  }, [nftCollection, status]);

  const mintedNftHasSameExternalUrl = mintedNfts.filter(
    (mintedNft) =>
      mintedNft.metadata.external_url ===
      // `https://drops.joyfa.io/nft/${nft.metadata.id}`,
      `https://store.joyfa.io/nft/${nft.metadata.id}`,
  );
  const isMintable = (nft_id: number, token_id: number) => {
    const uid = `${nft_id}#${token_id}`;
    const mintedNftHasSameUid = mintedNftHasSameExternalUrl.filter(
      (mintedNft) => {
        const attribute = (
          mintedNft.metadata.attributes as { trait_type: string; value: any }[]
        ).find((attr) => attr.trait_type === 'uid');
        return attribute?.value === uid;
      },
    );
    return mintedNftHasSameUid.length === 0;
  };

  const handleCollectButtonClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClosePopup();
    }
  };
  // const mintable = [...new Array(nft.supply.amount)]
  //   .map((_, i) => i + 1)
  //   .map((token_id) => isMintable(nft.id, token_id));

  return (
    <div className={styles['nft-info']}>
      <div className={styles['nft-details']}>
        <NftDetails {...nft} mintedNfts={mintedNftHasSameExternalUrl.length} />
      </div>
      <button className={styles['button']} onClick={handleCollectButtonClick}>
        Collect
      </button>
      {isPopupVisible && (
        <div
          className={styles['popup-container']}
          onClick={handleBackdropClick}
        >
          <div className={styles['popup']}>
            <div
              className={styles['popup-close-button']}
              onClick={handleClosePopup}
            >
              X
            </div>
            {mintingStatus === 'loading' ? (
              <>
                <div className={styles['id-title']}>Processing</div>
                <div className={styles['id-description']}>
                  Please wait a moment.
                </div>
              </>
            ) : mintingStatus === 'minted' ? (
              <>
                <div className={styles['id-title']}>
                  Your transaction has been issued.
                </div>
                <div className={styles['id-description']}>
                  Once it is successfully minted, it will be reflected on your
                  profile page.
                </div>
              </>
            ) : (
              <>
                <div className={styles['id-title']}>Select Sneaker ID</div>
                <div className={styles['id-description']}>
                  Select the ID for this sneaker. The chosen ID will be included
                  in the NFT name.
                </div>
                {errorMessage && (
                  <div className={styles['minting-error']}>{errorMessage}</div>
                )}
                <div className={styles['id-filter']}>
                  {[...new Array(Math.ceil(nft.supply.amount / 20))].map(
                    (_, i) => (
                      <button
                        className={
                          tokenIdFilter === i
                            ? styles['id-filter-button-selected']
                            : styles['id-filter-button']
                        }
                        key={i}
                        onClick={() => {
                          setTokenIdFilter(i);
                        }}
                      >
                        {1 + i * 20} - {(i + 1) * 20}
                      </button>
                    ),
                  )}
                </div>
                <div className={styles['mint-button-list']}>
                  {[...new Array(nft.supply.amount)]
                    .map((_, i) => i + 1)
                    // .map((token_id, i) =>
                    .map((token_id) =>
                      1 + tokenIdFilter * 20 <= token_id &&
                      token_id <= (tokenIdFilter + 1) * 20 ? (
                        <NftMintButton
                          key={token_id}
                          nft_id={nft.id}
                          token_id={token_id}
                          status={
                            status !== 'fetched'
                              ? 'loading'
                              : // : mintable[i]
                              isMintable(nft.id, token_id)
                              ? 'mintable'
                              : 'minted'
                          }
                          mintingStatus={mintingStatus}
                          setMintingStatus={setMintingStatus}
                          errorMessage={errorMessage}
                          setErrorMessage={setErrorMessage}
                        />
                      ) : null,
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
