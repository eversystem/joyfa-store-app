import axios from 'axios';
import { UserEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export type UserEntityUpdatableBySelf = Partial<
  Pick<
    UserEntity,
    | 'name'
    | 'icon'
    | 'cover'
    | 'description'
    | 'twitter'
    | 'instagram'
    | 'website'
  >
>;

export const updateUser = async (
  jwt: string,
  data: UserEntityUpdatableBySelf,
) => {
  const res = await axios.post(
    `${API_ENDPOINT}/user/update`,
    { data },
    { headers: { Authorization: `Bearer ${jwt}` } },
  );
  return res;
};
