import { useQuery } from "react-query";
import { getAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";

export interface IGetPendingNftRes {
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
  created_at: string;
  updated_at: string;
  nftId?: string;
}

const getPendingNft = async () => {
  return getAxios<{ data: IGetPendingNftRes[] }>(EndPoints.getMyPending);
};

export function useGetPendingNft() {
  return useQuery("my-pending", () => getPendingNft());
}
