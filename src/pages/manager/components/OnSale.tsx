import React, { useEffect, useState } from "react";
import { getIpfs, IOnchainProps } from "./MyPhotos";
import { useGetOnSaleNft, useGetTopTransferNft } from "../hooks/getOnchainNft";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";
import { INft } from "../types";
import { toast, ToastContainer } from "react-toastify";
import queryClient from "../../../queryClient";
import { useNavigate } from "react-router-dom";

export const OnSale: React.FC = () => {
  const [tab, setTab] = React.useState(1);

  const { data: onSaleData } = useGetOnSaleNft();
  const { data: topTransferData } = useGetTopTransferNft();
  const [data, setData] = useState(onSaleData);

  const [nfts, setNfts] = React.useState<IOnchainProps[]>([]);
  const navigate = useNavigate();
  const { web3, account, contract } = useWeb3();

  useEffect(() => {
    tab === 1 ? setData(onSaleData) : setData(topTransferData);
    console.log(tab);
  }, [tab]);

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
  }, [data]);

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

      if (nft.price === "0") {
        toast.error("This NFT is not for sale");
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

  const handleToImageDetail = (tokenId: string) => {
    navigate(`/manager/image-detail/${tokenId}`);
  };

  const handleTab = (tab: 1 | 2) => {
    setTab(tab);
  };

  return (
    <>
      <ToastContainer />

      <div className="border-b border-gray-200 light:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 light:text-gray-400">
          <li className="mr-2">
            <div
              className={`hover:cursor-pointer inline-flex p-4  border-b-2 border-blue-600 rounded-t-lg active light:text-blue-500 light:border-blue-500 group ${
                tab === 1
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              aria-current="page"
              onClick={() => handleTab(1)}
            >
              <svg
                aria-hidden="true"
                className={`w - 5 h-5 mr-2 ${
                  tab === 1
                    ? "text-blue-600 light:text-blue-500"
                    : "text-gray-400 light:text-gray-500 group-hover:text-gray-500 light:group-hover:text-gray-300"
                } `}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              List On Sale
            </div>
          </li>

          <li className="mr-2">
            <div
              className={`hover:cursor-pointer inline-flex p-4  border-b-2 border-blue-600 rounded-t-lg active light:text-blue-500 light:border-blue-500 group ${
                tab === 2
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              aria-current="page"
              onClick={() => handleTab(2)}
            >
              <svg
                aria-hidden="true"
                className={`w - 5 h-5 mr-2 ${
                  tab === 2
                    ? "text-blue-600 light:text-blue-500"
                    : "text-gray-400 light:text-gray-500 group-hover:text-gray-500 light:group-hover:text-gray-300"
                } `}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Top Transfer
            </div>
          </li>
        </ul>
      </div>

      <div className="columns-4 gap-8 w-full">
        {nfts &&
          nfts.map((item, index) => {
            return (
              <div key={index} className="w-full aspect-video pb-7 relative">
                <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow light:bg-gray-800 light:border-gray-700 overflow-hidden">
                  <div
                    className="transition-all duration-500 ease-in-out transform hover:scale-105 hover:cursor-pointer"
                    onClick={() => {
                      handleToImageDetail(item.nft.tokenId);
                    }}
                  >
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
                    <p className="mb-3 font-light text-gray-700 light:text-gray-400 text-overflow-ellipsis line-clamp-4">
                      Transfer count: {item.nft?.numberOfTransfer}
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
