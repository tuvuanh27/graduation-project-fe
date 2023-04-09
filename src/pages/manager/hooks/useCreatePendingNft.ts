import { useMutation } from "react-query";
import { ICreatePendingNftDto } from "../components/CreateNew";
import { axiosFormData } from "../../../axios/generic-api-call";
import { EndPoints } from "../../../axios/api-config";

const createPendingNft = async (request: ICreatePendingNftDto) => {
  return axiosFormData(EndPoints.createPending, request);
};

export function useCreatePendingNft() {
  const { isLoading, mutateAsync } = useMutation(createPendingNft);

  return { isCreated: isLoading, pendingNft: mutateAsync };
}
