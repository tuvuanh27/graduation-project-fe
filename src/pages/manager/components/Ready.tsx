import React, { useEffect } from "react";
import { useGetReadyNft } from "../hooks/useGetReady";
import axios from "axios";
import { IIpfsResponse } from "../types";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";
import { toast, ToastContainer } from "react-toastify";
import queryClient from "../../../queryClient";

interface IReadyProps {
  data: IIpfsResponse;
  ipfsHash: string;
  isPublic: boolean;
}

const getIpfs = async (
  uri: string,
  isPublic: boolean
): Promise<IReadyProps> => {
  const res = await axios.get<IIpfsResponse>(
    `${import.meta.env.VITE_APP_BASE_IPFS_URL as string}${uri}`
  );
  return { data: res.data, ipfsHash: uri, isPublic };
};

export const Ready: React.FC = () => {
  const { data } = useGetReadyNft();
  const [nfts, setNfts] = React.useState<IReadyProps[]>([]);
  const { contract, account } = useWeb3();
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchLinks = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const promises = data.data.data.map(async (item) => {
        return getIpfs(item.ipfsHash, item.isPublic);
      });

      const results = await Promise.all(promises);
      return setNfts(results);
    };

    if (data) {
      fetchLinks();
    }
  }, [data]);

  // function call to mint the NFT
  const mintNft = async (ipfsHash: string, isPublic: boolean) => {
    setLoading(true);
    const mintFee = await contract?.methods.mintingFee().call();
    try {
      const tx =
        contract &&
        (await contract.methods
          .mint(ipfsHash, isPublic)
          .send({ from: account, value: mintFee }));
      console.log(tx);

      setLoading(false);
      await queryClient.invalidateQueries("my-ready");

      toast("NFT Minted Successfully!", {
        type: "success",
      });
      // recall the getNfts function to update the UI
    } catch (error: any) {
      setLoading(false);
      toast(error.message, {
        type: "error",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>

            <div role="status">
              <svg
                aria-hidden="true"
                className="w-12 h-12 mr-2 text-gray-200 animate-spin light:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
            <p className="text-white mt-4 text-3xl ">
              Minting NFT..., please wait a minutes
            </p>
          </div>
        </div>
      )}
      <div className="columns-4 w-full gap-8">
        {nfts &&
          nfts.map((item, index) => {
            return (
              <div key={index} className="w-full aspect-video pb-7 relative">
                <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow light:bg-gray-800 light:border-gray-700 overflow-hidden">
                  <div className="transition-all duration-500 ease-in-out transform hover:scale-105 hover:cursor-pointer">
                    <img
                      className="object-cover w-full h-full"
                      src={item.data.image}
                      alt="Random image"
                    />
                  </div>
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-800 light:text-white">
                      {item.data.name}
                    </h5>
                    <p className="mb-3 font-light text-gray-700 light:text-gray-400 text-overflow-ellipsis line-clamp-4">
                      {item.data.description}
                    </p>
                    <button
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                      onClick={() => mintNft(item.ipfsHash, item.isPublic)}
                    >
                      Mint Now!
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
