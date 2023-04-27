export type ListingRequest = {
  creator: string;
  name: string;
  description: string;
  image: string;
  animation_url: string;
  glb_r: string;
  glb_l: string;
  price: number;
  supply: number;
  signature: string;
};

export type CreatorEntity = {
  address: string;
  name: string;
  icon: string;
};

export type MetadataEntity = {
  id: number;
  name: string;
  description: string;
  image: string;
  animation_url: string;
  glb_r: string;
  glb_l: string;
  creator: CreatorEntity;
  sale: SaleEntity;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type SaleEntity = {
  id: number;
  price: number;
  supply: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type NftEntity = {
  uid: number;
  metadata: MetadataEntity;
  sequence: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};
