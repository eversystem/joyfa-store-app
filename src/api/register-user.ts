import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const registerUserProfile = async (jwt: string, name: string) => {
  const res = await axios.post(
    `${API_ENDPOINT}/user/register`,
    { name },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );
  return res;
};
