import React, { useEffect, useState } from "react";
import { useGetOnchainNftByOwner } from "../hooks/getOnchainNft";
import { IIpfsResponse, INft } from "../types";
import axios from "axios";
import SellModal from "./SellModal";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";
import { ToastContainer } from "react-toastify";

export interface IOnchainProps {
  data: IIpfsResponse;
  ipfsHash: string;
  isPublic: boolean;
  nft: INft;
}

export const getIpfs = async (nft: INft): Promise<IOnchainProps> => {
  const res = await axios.get<IIpfsResponse>(
    `${import.meta.env.VITE_APP_BASE_IPFS_URL as string}${nft.uri}`
  );
  return { data: res.data, ipfsHash: nft.uri, isPublic: nft.isPublic, nft };
};

export const MyPhotos: React.FC = () => {
  const { data } = useGetOnchainNftByOwner();

  const [nfts, setNfts] = React.useState<IOnchainProps[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [nft, setNft] = useState<INft>();
  const { web3 } = useWeb3();

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

  const handleOpenModal = (nft: INft) => {
    setNft(nft);
    setIsOpenModal(true);
  };

  return (
    <>
      <SellModal nft={nft} open={isOpenModal} setOpen={setIsOpenModal} />

      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 lg:py-4 mx-auto">
        <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          {nfts &&
            nfts.map((item, index) => {
              return (
                <div className="group rounded-xl overflow-hidden" key={index}>
                  <div className="sm:flex">
                    <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-72">
                      <img
                        className="group-hover:scale-125 transition-transform duration-500 ease-in-out w-full h-full absolute top-0 left-0 object-cover rounded-xl"
                        src={item.data.image}
                        alt="Image Description"
                      />
                    </div>

                    <div className="grow mt-4 sm:mt-0 sm:ml-6 px-4 sm:px-0">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 light:text-gray-300 light:group-hover:text-white">
                        {item.data.name}
                      </h3>
                      <p className="mt-3 text-gray-600 light:text-gray-400 text-overflow-ellipsis line-clamp-4">
                        {item.data.description}
                      </p>
                      <div className="flex flex-row grow mt-4 center justify-center">
                        <label
                          htmlFor="externalUrl"
                          className="text-md block mt-2 mr-2 text-center font-semibold text-gray-800 group-hover:text-gray-600 light:text-gray-300 light:group-hover:text-white"
                        >
                          Price
                        </label>
                        <input
                          type="text"
                          id="externalUrl"
                          className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                          placeholder="John"
                          name="externalUrl"
                          value={web3?.utils.fromWei(item.nft.price, "ether")}
                          readOnly
                        />
                      </div>
                      <div
                        className="flex flex-row"
                        onClick={() => handleOpenModal(item.nft)}
                      >
                        <div className="mt-4 mr-10 hover:cursor-pointer inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
                          Sell
                          <svg
                            className="w-2.5 h-2.5"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <a
                          href={`https://testnets.opensea.io/assets/bsc-testnet/${item.nft.contractAddress}/${item.nft.tokenId}`}
                          target="_blank"
                        >
                          <p className="mt-4 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium">
                            Explore
                            <svg
                              className="w-2.5 h-2.5"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
