import { useMutation, useQuery } from "react-query";
import { getAxios, postAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";
import { INft } from "../types";

export interface IListNftIds {
  nftIds: string[];
}

const getOnchainNftByOwner = async () => {
  return getAxios<{ data: INft[] }>(EndPoints.getOnchainByOwner);
};

const getOnSaleNft = async () => {
  return getAxios<{ data: INft[] }>(EndPoints.getNftsOnSale);
};

export function useGetOnchainNftByOwner() {
  return useQuery("my-onchain", () => getOnchainNftByOwner());
}

export function useGetOnSaleNft() {
  return useQuery("on-sale", () => getOnSaleNft());
}

const postNftByIds = async (ids: string[]) => {
  return postAxios(EndPoints.getListNftsByIds, {
    nftIds: ids,
  });
};

export function usePostNftById() {
  const { isLoading, mutateAsync } = useMutation(postNftByIds);

  return { isLoading, mutateAsync };
}
