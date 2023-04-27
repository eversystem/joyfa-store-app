import axios from 'axios';
import { MetadataEntity } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const getAllMetadatas = async () => {
  const res = await axios.get<MetadataEntity[]>(
    `${API_ENDPOINT}/nft/metadatas/all`,
  );
  return res.data;
};
