import React, { useEffect } from "react";
import { getIpfs, IOnchainProps } from "./MyPhotos";
import { useSearchStore } from "../../../stores/searchQueryStore";
import { useGetOnSaleNft } from "../hooks/getOnchainNft";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";
import { INft } from "../types";
import { toast, ToastContainer } from "react-toastify";
import queryClient from "../../../queryClient";

export const OnSale: React.FC = () => {
  const { searchQuery } = useSearchStore();
  const { data } = useGetOnSaleNft();
  const [nfts, setNfts] = React.useState<IOnchainProps[]>([]);
  const { web3, account, contract } = useWeb3();

  useEffect(() => {
    const fetchLinks = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const promises = data.data.data.map(async (item) => {
        return getIpfs(item);
      });

      const results = await Promise.all(promises);
      return setNfts(results);
    };

    if (data) {
      fetchLinks();
    }
  }, [data, searchQuery]);

  const handleBuyNft = async (nft: INft) => {
    try {
      console.log(account, nft);
      if (!account) {
        console.log("no account");
        toast.error("Please connect your wallet");
      }
      if (account === nft.owner) {
        return;
      }
      await contract?.methods
        .buyToken(nft.tokenId)
        .send({ from: account, value: nft.price });
      await queryClient.invalidateQueries("on-sale");
      toast("NFT bought successfully", {
        type: "success",
      });
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="columns-5 gap-8 w-full">
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
                      Price: {web3?.utils.fromWei(item.nft.price, "ether")} BNB
                    </p>
                    {item.nft.owner === account && (
                      <p className="mb-3 font-light text-red-700 light:text-gray-400 text-overflow-ellipsis line-clamp-4">
                        You are the owner of this NFT
                      </p>
                    )}
                    <button
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-600 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 ${
                        item.nft.owner === account &&
                        "cursor-not-allowed opacity-50"
                      } `}
                      onClick={() => handleBuyNft(item.nft)}
                    >
                      Buy Now!
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
