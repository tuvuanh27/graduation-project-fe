import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { INft } from "../types";
import { useWeb3 } from "../../../hooks/useWeb3/useWeb3";
import { toast, ToastContainer } from "react-toastify";

type SellModalProps = {
  nft: INft | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function SellModal(props: SellModalProps) {
  const { open, setOpen } = props;
  const [price, setPrice] = useState<string>(props.nft?.price || "");
  const { web3, contract, account } = useWeb3();
  const cancelButtonRef = useRef(null);

  const handleSell = async () => {
    try {
      if (props.nft && web3 && contract) {
        const priceWei = web3.utils.toWei(price);
        const tx = await contract.methods
          .setSalePrice(props.nft.tokenId, priceWei)
          .send({ from: account });
        console.log(tx);
        toast("NFT put on sale successfully", {
          type: "success",
        });
      }
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast(error.message, {
        type: "error",
      });
    }
  };

  return (
    <>
      <ToastContainer />

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 font-sans "
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ShoppingCartIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Sell Your NFT
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to sell your NFT? You will be
                            able to set the price.
                          </p>
                        </div>
                        <div className="flex flex-row grow mt-4 center justify-center">
                          <label
                            htmlFor="priceNft"
                            className="text-md block mt-2 mr-2 text-center font-semibold text-gray-800 group-hover:text-gray-600 light:text-gray-300 light:group-hover:text-white"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            id="priceNft"
                            className="bg-gray-50 h-8 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-white light:focus:ring-blue-500 light:focus:border-blue-500"
                            placeholder="1"
                            name="priceNft"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={handleSell}
                    >
                      Sell
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
