export interface INft {
  tokenId: string;
  uri: string;
  contractAddress: string;
  isPublic: boolean;
  viewers: string[];
  description: string;
  owner: string;
  name: string;
  metadata: INFTMetadata;
  blockNumberCreated: number;
  blockTimeCreated: number;
}

export interface INftAttributes {
  trait_type?: string;
  value?: string;
}

export interface INFTMetadata {
  name: string;
  description: string;
  image: string;
  externalUrl?: string;
  attributes?: INftAttributes[];
}

export interface INftPending {
  uri: string;
  isPublic: boolean;
  owner: string;
  metadata: INFTMetadata;
  ipfsHash?: string;
  isUploaded?: boolean;
}

export interface INftTransfer {
  tokenId: string;
  txHash: string;
  contractAddress: string;
  from: string;
  to: string;
  blockNumber: number;
  blockTime: number;
}

export interface IIpfsResponse {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes?: INftAttributes[];
}
