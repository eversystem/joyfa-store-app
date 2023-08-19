import axios from 'axios';
import { GetNftsResponse, Nft } from './alchemy';
import { MYSTUDIO_API_ENDPOINT } from './env';

export const getCollectionNfts = async (address: string) => {
  return await axios.get<GetNftsResponse>(
    `${MYSTUDIO_API_ENDPOINT}/alchemy/nfts/collections/free`,
    { params: { address } },
  );
};

export const getEthereumNfts = async (address: string) => {
  return await axios.get<GetNftsResponse>(
    `${MYSTUDIO_API_ENDPOINT}/alchemy/nfts/ethereum/free`,
    { params: { address } },
  );
};

export const getNftMetadata = async (contract: string, id: string) => {
  return await axios.get<Nft>(`${MYSTUDIO_API_ENDPOINT}/alchemy/nft/metadata`, {
    params: { contract, id },
  });
};

export type RequestedNftsRes = {
  address: string;
  token_id: string;
}[];

export const getRequestedNfts = async (address: string) => {
  return await axios.get<RequestedNftsRes>(
    `${MYSTUDIO_API_ENDPOINT}/minting/requested/free`,
    { params: { address } },
  );
};
