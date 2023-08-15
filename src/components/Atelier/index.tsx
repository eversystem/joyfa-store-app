import { useEffect, useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
import { Nft } from 'src/utils/alchemy';
import {
  RequestedNftsRes,
  getEthereumNfts,
  getRequestedNfts,
} from 'src/utils/mystudio-api';
import styles from './styles/atelier.module.css';

enum AtelierStatus {
  init,
  loading,
  success,
  error,
}

export const Atelier: React.FC = () => {
  const address = useAddress();
  const [status, setStatus] = useState<AtelierStatus>(AtelierStatus.init);
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [requestedNfts, setRequestedNfts] = useState<RequestedNftsRes>([]);
  useEffect(() => {
    if (status === AtelierStatus.init && address) {
      setStatus(AtelierStatus.loading);
      void Promise.all([getRequestedNfts(address), getEthereumNfts(address)])
        .then(([res0, res1]) => {
          setRequestedNfts(res0.data);
          setNfts(res1.data.ownedNfts);
          setStatus(AtelierStatus.success);
        })
        .catch(() => {
          setStatus(AtelierStatus.error);
        });
    }
  }, [address, status]);
  console.log(nfts);
  console.log(requestedNfts);
  const isRequested = (nft: Nft) =>
    requestedNfts.findIndex(
      (requestedNft) =>
        requestedNft.address.toLowerCase() ===
          nft.contract.address.toLowerCase() &&
        requestedNft.token_id === nft.id.tokenId,
    ) !== -1;
  return null;
};
