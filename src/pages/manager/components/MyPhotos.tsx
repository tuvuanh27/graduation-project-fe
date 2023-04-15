import React, { useEffect, useState } from "react";
import { useGetOnchainNftByOwner } from "../hooks/getOnchainNft";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";
import { IIpfsResponse, INft } from "../types";
import axios from "axios";

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

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 lg:py-4 mx-auto">
      <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        {nfts &&
          nfts.map((item, index) => {
            return (
              <a
                className="group rounded-xl overflow-hidden"
                key={index}
                href={`https://testnets.opensea.io/assets/bsc-testnet/${item.nft.contractAddress}/${item.nft.tokenId}`}
                target="_blank"
              >
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
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
};
