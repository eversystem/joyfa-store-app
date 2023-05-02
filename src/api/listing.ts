import axios from 'axios';
import { ListingRequest } from 'src/utils/data';
import { API_ENDPOINT } from 'src/utils/env';

export const listing = async (data: ListingRequest) => {
  const res = await axios.post(`${API_ENDPOINT}/nft/listing`, data);
  return res;
};
