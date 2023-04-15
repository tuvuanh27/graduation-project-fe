import { useMutation } from "react-query";
import { postAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";

const searchNft = async (query: string) => {
  return postAxios(EndPoints.search, { q: query });
};

export function useSearchNft() {
  const { isLoading, mutateAsync } = useMutation(searchNft);

  return { isSearching: isLoading, nftSearched: mutateAsync };
}
