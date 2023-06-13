import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const register = async (jwt: string, address: string, name: string) => {
  const res = await axios.post(
    `${API_ENDPOINT}/user/register`,
    { address, name },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );
  return res;
};
