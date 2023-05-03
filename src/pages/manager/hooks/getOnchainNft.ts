import { useMutation, useQuery } from "react-query";
import { getAxios, postAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";
import { INft, INftTransfer } from "../types";

export interface IListNftIds {
  nftIds: string[];
}

const getOnchainNftByOwner = async () => {
  return getAxios<{ data: INft[] }>(EndPoints.getOnchainByOwner);
};

const getOnSaleNft = async () => {
  return getAxios<{ data: INft[] }>(EndPoints.getNftsOnSale);
};

const getTopTransferNft = async () => {
  return getAxios<{ data: INft[] }>(EndPoints.getNftTopTransfer);
};

const getTransferHistory = async (id: string) => {
  return getAxios<{ data: INftTransfer[] }>(EndPoints.getTransferHistory(id));
};

export function useGetTransferHistory(id: string) {
  return useQuery(["transfer-history", id], () => getTransferHistory(id));
}

export function useGetOnchainNftByOwner() {
  return useQuery("my-onchain", () => getOnchainNftByOwner());
}

export function useGetOnSaleNft() {
  return useQuery("on-sale", () => getOnSaleNft());
}

export function useGetTopTransferNft() {
  return useQuery("top-transfer", () => getTopTransferNft());
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
