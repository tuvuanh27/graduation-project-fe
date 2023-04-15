import { useQuery } from "react-query";
import { getAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";
import { INft } from "../types";

interface ISearchQuery {
  q: string;
}

const getPublicNft = async (param?: ISearchQuery) => {
  return getAxios<{ data: INft[] }, ISearchQuery>(EndPoints.publicNft, param);
};

export function useGetPublicNft(param?: ISearchQuery) {
  return useQuery(["public-onchain", param], () => getPublicNft(param));
}
