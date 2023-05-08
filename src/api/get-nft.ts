import axios from 'axios';
import { NftEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getNft = async (nft_id: number) => {
  const res = await axios.get<NftEntity>(`${API_ENDPOINT}/nft/nft/${nft_id}`);
  return res.data;
};
