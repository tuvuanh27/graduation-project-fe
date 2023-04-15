import React, { useEffect } from "react";
import { getIpfs, IOnchainProps } from "./MyPhotos";
import { useGetPublicNft } from "../hooks/getPublicNft";
import { useSearchStore } from "../../../stores/searchQueryStore";
import { useNavigate } from "react-router-dom";

export const Explore: React.FC = () => {
  const { searchQuery } = useSearchStore();
  const { data } = useGetPublicNft({ q: searchQuery });
  const [nfts, setNfts] = React.useState<IOnchainProps[]>([]);
  const navigate = useNavigate();

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

  const handleToImageDetail = (tokenId: string) => {
    navigate(`/manager/image-detail/${tokenId}`);
  };

  return (
    <div className="columns-4 gap-8 w-full">
      {nfts &&
        nfts.map((item, index) => {
          return (
            <div
              className="w-full aspect-video pb-7"
              key={index}
              onClick={() => {
                handleToImageDetail(item.nft.tokenId);
              }}
            >
              <div className="bg-white rounded-[20px] shadow-lg overflow-hidden overflow-hidden">
                <img
                  className="object-cover w-full h-full transition-all duration-500 ease-in-out transform hover:scale-125 hover:cursor-pointer"
                  src={item.data.image}
                  alt="Random image"
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};
