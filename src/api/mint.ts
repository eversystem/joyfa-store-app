import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const mint = async (uid: number, to: string) => {
  const res = await axios.post(`${API_ENDPOINT}/nft/mint`, {
    uid,
    to,
  });
  return res;
};
