import axios from 'axios';
import { API_ENDPOINT } from 'src/utils/env';

export type UserEntityRegsiterable = {
  name: string;
  description?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  icon?: File;
  cover?: File;
};

export const registerUserProfile = async (
  jwt: string,
  data: UserEntityRegsiterable,
) => {
  // const formData = new FormData();
  // for (const key in data) {
  //   const d = data[key as keyof typeof data];
  //   if (d !== undefined) {
  //     formData.append(key, d);
  //   }
  // }
  const res = await axios.post(
    `${API_ENDPOINT}/user/register`,
    { ...data },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return res;
};
