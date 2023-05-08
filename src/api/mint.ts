import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const mint = async (nft_id: number, token_id: number, to: string) => {
  const res = await axios.post(`${API_ENDPOINT}/nft/mint`, {
    nft_id,
    token_id,
    to,
  });
  return res;
};
