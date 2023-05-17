import axios from 'axios';
import { UserEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getAllCreators = async () => {
  const res = await axios.get<UserEntity[]>(`${API_ENDPOINT}/user/creators`);
  return res.data;
};
