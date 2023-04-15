import { EndPoints } from "../../../axios/api-config";
import { deleteAxios } from "../../../axios/generic-api-call";
import { useMutation } from "react-query";

const deletePending = async (pendingId: string) => {
  return deleteAxios(EndPoints.deletePending, pendingId);
};

export function useDeletePending() {
  const { isLoading, mutateAsync } = useMutation(deletePending);

  return { isDeleted: isLoading, deletePending: mutateAsync };
}
