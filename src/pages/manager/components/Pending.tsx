import React from "react";
import { IGetPendingNftRes, useGetPendingNft } from "../hooks/useGetPendingNft";
import { useDeletePending } from "../hooks/useDeletePending";
import { toast, ToastContainer } from "react-toastify";
import queryClient from "../../../queryClient";
import { useUploadMetadataIpfs } from "../hooks/useUploadPending";

export const Pending: React.FC = () => {
  const { data } = useGetPendingNft();
  const { deletePending } = useDeletePending();
  const { pendingUpload } = useUploadMetadataIpfs();

  const handleDelete = async (id: string) => {
    try {
      await deletePending(id);
      await queryClient.invalidateQueries("my-pending");
      toast("Deleted successfully", { type: "success" });
    } catch (error: any) {
      toast(error?.message, { type: "error" });
    }
  };

  const handleUpload = async (id: string) => {
    try {
      await pendingUpload(id);
      await queryClient.invalidateQueries("my-pending");
      toast("Uploaded successfully", { type: "success" });
    } catch (error: any) {
      toast(error?.message, { type: "error" });
    }
  };

  return (
    <div className="columns-4 gap-6 w-full">
      <ToastContainer />
      {data?.data &&
        data.data.data.map((item: IGetPendingNftRes, index: number) => {
          return (
            <div className="w-full aspect-video pb-7 relative" key={index}>
              <div className="bg-white rounded-[20px] shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="transition-all duration-500 ease-in-out transform hover:scale-125">
                    <img
                      className="object-cover w-full h-full rounded-[20px]"
                      src={item.uri}
                      alt="Random image"
                    />
                    <div className="opacity-0 hover:opacity-100 transition duration-300 absolute top-1/2 left-0 right-0 bottom-0 flex justify-center items-center z-20">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-medium text-sm py-1.5 px-4 rounded-2xl mr-2"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-medium text-sm py-1.5 px-4 rounded-2xl"
                        onClick={() => handleUpload(item._id)}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
