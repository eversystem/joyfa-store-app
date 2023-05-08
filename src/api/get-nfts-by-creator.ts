import axios from 'axios';
import { NftEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getNftsByCreator = async (address: string) => {
  const res = await axios.get<NftEntity[]>(
    `${API_ENDPOINT}/nft/nfts/creator/${address}`,
  );
  return res.data;
};
