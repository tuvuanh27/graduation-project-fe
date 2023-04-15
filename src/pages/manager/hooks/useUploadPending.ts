import { useMutation } from "react-query";
import { postAxios } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";

const uploadMetadataPendingNft = async (nftId: string) => {
  return postAxios(EndPoints.uploadMetadata, { nftId });
};

export function useUploadMetadataIpfs() {
  const { isLoading, mutateAsync } = useMutation(uploadMetadataPendingNft);

  return { isUploaded: isLoading, pendingUpload: mutateAsync };
}
