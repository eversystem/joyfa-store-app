import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const signin = async (address: string, signature: string) => {
  const res = await axios.post<string>(`${API_ENDPOINT}/auth/signin`, {
    username: address,
    password: signature,
  });
  return res.data;
};
