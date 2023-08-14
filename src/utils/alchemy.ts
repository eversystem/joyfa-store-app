import axios from 'axios';

export interface NftMedia {
  bytes: number;
  format: string;
  raw: string;
  gateway: string;
  thumbnail: string;
}
export interface TokenUri {
  raw: string;
  gateway: string;
}
export type MCHNFT = {
  id: string;
  name: string;
  description: string;
  image: string;
  timestamp: number;
  language: string;
  attributes: {
    type_name: string;
    lv: number;
    rarity: string;
    hp: number;
    phy: number;
    int: number;
    agi: number;
    active_skill: string;
    passive_skill: string;
  };
  external_url: string;
  image_url: string;
  home_url: string;
  extra_data: {
    active_skill_id: number;
    art_history: string[];
    ce: number;
    current_art: string;
    current_stamina: number;
    hero_type: number;
    max_stamina: number;
    passive_skill_id: number;
  };
};

export interface NftMetadata extends Record<string, any> {
  name?: string;
  description?: string;
  image?: string;
  animation_url?: string;
  glb_l?: string;
  glb_r?: string;
  attributes?: Array<Record<string, any>>;
}
export interface NftContract {
  address: string;
}
export interface NftTokenMetadata {
  tokenType: 'ERC721' | 'ERC1155';
}
export interface NftId {
  tokenId: string;
  tokenMetadata?: NftTokenMetadata;
}
export interface BaseNft {
  contract: NftContract;
  id: NftId;
  balance: string;
}

export interface Nft extends BaseNft {
  title: string;
  description: string;
  tokenUri?: TokenUri;
  media?: NftMedia[];
  metadata?: NftMetadata;
  timeLastUpdated: string;
  error?: string;
}

export interface GetNftsResponse {
  ownedNfts: Nft[];
  pageKey?: string;
  totalCount: number;
}

export type GetNFTsProps = {
  owner: string;
  contractAddresses?: string[];
};

// export const getEthNfts = (props: GetNFTsProps) => {
//   const apiKey = 'demo';
//   const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}/getNFTs/`;
//   const contractAddressQuery = props.contractAddresses
//     ? props.contractAddresses
//         .map((address) => `&contractAddresses[]=${address}`)
//         .join('')
//     : '';
//   const url = `${baseURL}?owner=${props.owner}${contractAddressQuery}`;
//   return axios.get<GetNftsResponse>(url);
// };

// export const getPolygonNfts = (props: GetNFTsProps) => {
//   const apiKey = 'demo';
//   const baseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`;
//   const contractAddressQuery = props.contractAddresses
//     ? props.contractAddresses
//         .map((address) => `&contractAddresses[]=${address}`)
//         .join('')
//     : '';
//   const url = `${baseURL}?owner=${props.owner}${contractAddressQuery}`;
//   return axios.get<GetNftsResponse>(url);
// };
