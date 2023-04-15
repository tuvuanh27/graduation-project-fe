import { useQuery } from "react-query";
import { getAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";

export interface IGetReadyNftRes {
  _id: string;
  isPublic: boolean;
  isUploaded: boolean;
  metadata: {
    attributes: {
      traitType: string;
      value: string;
    }[];
    description: string;
    image: string;
    name: string;
    externalUrl?: string;
  };
  owner: string;
  uri: string;
  ipfsHash: string;
  created_at: string;
  updated_at: string;
}

const getReadyNft = async () => {
  return getAxios<{ data: IGetReadyNftRes[] }>(EndPoints.getReady);
};

export function useGetReadyNft() {
  return useQuery("my-ready", () => getReadyNft());
}
