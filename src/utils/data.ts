export type ListingRequest = {
  // creator: string;
  name: string;
  description: string;
  image: string;
  animation_url: string;
  glb_r: string;
  glb_l: string;
  price: number;
  supply: number;
  // signature: string;
};

export type UserEntity = {
  address: string;
  admin: boolean;
  creator: boolean;
  name: string;
  icon?: string;
  cover?: string;
  description?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
};

export type MetadataEntity = {
  id: number;
  name: string;
  description: string;
  image: string;
  animation_url: string;
  glb_r: string;
  glb_l: string;
};

export type SupplyEntity = {
  id: number;
  price: number;
  amount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type NftEntity = {
  id: number;
  metadata: MetadataEntity;
  creator: UserEntity;
  supply: SupplyEntity;
  createdAt: Date | string;
  updatedAt: Date | string;
};
