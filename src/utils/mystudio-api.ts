import axios from 'axios';
import { GetNftsResponse } from './alchemy';
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
