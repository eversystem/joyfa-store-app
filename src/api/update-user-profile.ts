import axios from 'axios';
// import { UserEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

// export type UserEntityUpdatableBySelf = Partial<
//   Pick<
//     UserEntity,
//     | 'name'
//     | 'icon'
//     | 'cover'
//     | 'description'
//     | 'twitter'
//     | 'instagram'
//     | 'website'
//   >
// >;
export type UserEntityUpdatableBySelf = {
  name?: string;
  description?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  icon?: File;
  cover?: File;
};

export const updateUserProfile = async (
  jwt: string,
  data: UserEntityUpdatableBySelf,
) => {
  // const formData = new FormData();
  // for (const key in data) {
  //   const d = data[key as keyof typeof data];
  //   if (d !== undefined) {
  //     formData.append(key, d);
  //   }
  // }
  const res = await axios.post(
    `${API_ENDPOINT}/user/update`,
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
