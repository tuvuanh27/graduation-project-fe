import React from "react";
import { useGetTransferHistory, usePostNftById } from "../hooks/getOnchainNft";
import { useParams } from "react-router";
import { INft } from "../types";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";

export const NftDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = usePostNftById();
  const [data, setData] = React.useState<INft>();
  const transferHistory = useGetTransferHistory(id as string);
  const { web3 } = useWeb3();
  console.log(transferHistory.data);

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
    <div className="flex flex-row">
      <div className="flex-shrink-0 relative rounded-xl  w-80">
        <img
          className="transition-transform duration-500 ease-in-out w-full absolute top-0 left-0 object-cover rounded-xl"
          src={data.metadata.image}
          alt="Image Description"
        />
      </div>
      <div className="w-full px-8">
        <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
        <h4 className="text-md font-bold mb-2">
          Price: {web3?.utils.fromWei(data.price, "ether")} BNB
        </h4>
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
        {transferHistory.data && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Transfer History
            </h3>
            <ul className="text-gray-700">
              {transferHistory.data?.data?.data?.map((item, i) => (
                <li
                  key={i}
                  className="flex mb-2 hover:underline hover:text-blue-600 hover:cursor-pointer text-blue-600"
                >
                  <a
                    className=""
                    href={`https://testnet.bscscan.com/tx/${item.txHash}`}
                    target={"_blank"}
                  >
                    <strong className="mr-2">
                      {item.from.slice(0, 4) +
                        "..." +
                        item.from.slice(-4) +
                        " => "}
                    </strong>
                    <span>
                      {item.to.slice(0, 4) + "..." + item.to.slice(-4)} Tx Hash:
                      {item.txHash.slice(0, 4) + "..." + item.txHash.slice(-4)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  ) : (
    <>Loading...</>
  );
};
