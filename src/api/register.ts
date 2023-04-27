import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const register = async (address: string, name: string) => {
  const res = await axios.post(`${API_ENDPOINT}/creator/register`, {
    address,
    name,
  });
  return res;
};
