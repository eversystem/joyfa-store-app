import {
  ThirdwebStorage,
  StorageDownloader,
  IpfsUploader,
} from '@thirdweb-dev/storage';

const uploader = new IpfsUploader();
const downloader = new StorageDownloader();
const gatewayUrls = {
  'ipfs://': [
    'https://joyfa.mypinata.cloud/ipfs/',
    'https://gatway.ipfscdn.ipfs/',
    'https://couldfrare-ipfs.com/ipfs/',
    'https://ipfs.io/ipfs/',
  ],
};
export const storage = new ThirdwebStorage({
  uploader,
  downloader,
  gatewayUrls,
});
