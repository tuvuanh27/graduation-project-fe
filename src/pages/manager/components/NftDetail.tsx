import React from "react";
import { usePostNftById } from "../hooks/getOnchainNft";
import { useParams } from "react-router";
import { INft } from "../types";

export const NftDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = usePostNftById();
  const [data, setData] = React.useState<INft>();

  React.useEffect(() => {
    const fetchNft = async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = await mutateAsync([id]);
      setData(res.data.data[0]);
    };
    fetchNft();
  }, [id, mutateAsync]);

  return data ? (
    <div className="flex">
      <div className="flex-shrink-0 relative rounded-xl overflow-hidden w-80">
        <img
          className="hover:scale-125 transition-transform duration-500 ease-in-out w-full absolute top-0 left-0 object-cover rounded-xl"
          src={data.metadata.image}
          alt="Image Description"
        />
      </div>
      <div className="w-1/2 px-8">
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <h4 className="text-md font-bold mb-2">Price: {data.price}</h4>
        <p className="text-gray-700 mb-4">{data?.description}</p>
        <p className="text-gray-700 mb-4">{data?.metadata?.externalUrl}</p>
        <ul className="text-gray-700">
          {data.metadata.attributes &&
            data.metadata.attributes.map((attr, i) => (
              <li key={i} className="flex mb-2">
                <strong className="mr-2">
                  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    attr?.trait_type || attr?.traitType
                  }
                  :
                </strong>
                <span>{attr.value}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
