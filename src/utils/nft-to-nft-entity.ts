import { NFT } from '@thirdweb-dev/sdk';
import { getNft } from 'src/api';

export const convertNftToNftEntity = async (nft: NFT) => {
  return await getNft(Number(nft.metadata.id));
};
