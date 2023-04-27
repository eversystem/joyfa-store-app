import axios from 'axios';
import { NftEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getAllNfts = async () => {
  const res = await axios.get<NftEntity[]>(`${API_ENDPOINT}/nft/nfts/all`);
  return res.data;
};
