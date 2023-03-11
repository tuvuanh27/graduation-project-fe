import React, { useEffect, useState } from "react";
import Logo from "../../assets/google-logo.png";
import Button from "../common/Button";
import { useWeb3 } from "../../hooks/useWeb3/useWeb3";
import { Disconnected } from "../Disconnected/Disconnected";
import { Connected } from "../Connected/Connected";
import { ProviderStringType } from "../../utils/types";

const Header = () => {
  const {
    connectProvider,
    changeProvider,
    providerString,
    account,
    web3,
    balance,
  } = useWeb3();
  const connected = !!account && !!web3;
  const [loading, setLoading] = useState(!!providerString);

  const [isOpenModalConnected, setIsOpenModalConnected] = React.useState(false);
  const handleConnectWallet = () => {
    setIsOpenModalConnected(true);
  };

  useEffect(() => {
    if (connected && loading) setLoading(false);
  }, [connected, loading]);

  const log = async () => {
    console.log(connected, account, balance);
    // log chain info
    const chainId = web3 && (await web3.eth.getChainId());
    console.log("chainId: ", chainId);
  };

  const closeModal = () => {
    setIsOpenModalConnected(false);
  };

  const handleConnectProvider = React.useCallback(
    async (provider: ProviderStringType) => {
      // Set the UI state to loading to prevent further interaction
      setLoading(true);
      // attempt to connect provider via web3Hook
      await connectProvider(provider).finally(() => {
        // Remove the UI loading state
        // show connected UI state on success
        // show disconnected out UI state on failure
        setLoading(false);
      });
    },
    [connectProvider]
  );

  const handleChangeProvider = React.useCallback(() => {
    // Set the UI state to loading to prevent further interaction
    setLoading(true);
    // attempt to connect via web3Hook
    changeProvider();
    // Remove the UI loading state
    // show disconnected UI state on failure
    setLoading(false);
  }, [changeProvider]);

  return (
    <header className="bg-white flex justify-between items-center py-4 px-6">
      <div className="cursor-pointer">
        <img src={Logo} alt="Logo" className="h-8" />
      </div>
      <div>
        {loading ? (
          <>loading...</>
        ) : connected ? (
          <Button onClick={handleConnectWallet} bgColor="red">
            {account?.slice(0, 6) + "..." + account?.slice(-4)} - Balance:{" "}
            {balance}
          </Button>
        ) : (
          <Button onClick={handleConnectWallet} bgColor="red">
            Connect Wallet
          </Button>
        )}
      </div>

      {/* Modal */}
      {isOpenModalConnected ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {connected
                      ? "Account info"
                      : " Choose the wallet connect provider"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {loading ? (
                    <p>loading...</p>
                  ) : (
                    <div>
                      {!connected && (
                        <Disconnected handleConnect={handleConnectProvider} />
                      )}
                      {connected && (
                        <Connected
                          web3={web3}
                          account={account}
                          providerString={providerString}
                          handleChangeProvider={handleChangeProvider}
                          balance={balance}
                        />
                      )}
                    </div>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </header>
  );
};

export default Header;
