import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export const isCreatorAddress = async (address: string) => {
  const res = await axios.get<boolean>(
    `${API_ENDPOINT}/user/creator/check/${address}`,
  );
  return res.data;
};
