import axios from 'axios';
import { NftEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getNftsByMetadataId = async (id: number) => {
  const res = await axios.get<NftEntity[]>(
    `${API_ENDPOINT}/nft/nfts/metadata/${id}`,
  );
  return res.data;
};
