import axios from 'axios';
import { UserEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getUserInfo = async (address: string) => {
  const res = await axios.get<UserEntity>(
    `${API_ENDPOINT}/user/info/${address}`,
  );
  return res.data;
};
