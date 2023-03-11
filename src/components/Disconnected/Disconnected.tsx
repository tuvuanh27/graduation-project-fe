import { memo } from "react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import type { ProviderStringType } from "../../utils/types";

type DisconnectedProps = {
  handleConnect: (selectedProvider: ProviderStringType) => Promise<void>;
};

export const Disconnected = memo(({ handleConnect }: DisconnectedProps) => {
  return (
    <>
      <p className="text-1xl font-semibold mb-6 text-center">
        Connect your wallet
      </p>
      <div className="flex flex-auto justify-center">
        <ConnectWalletButton
          providerString="coinbase"
          handleConnect={handleConnect}
          text="Coinbase Wallet"
        />
        <ConnectWalletButton
          providerString="metamask"
          handleConnect={handleConnect}
          text="MetaMask"
          color="red"
        />
        <ConnectWalletButton
          providerString="walletconnect"
          handleConnect={handleConnect}
          text="WalletConnect"
          color="green"
        />
      </div>
    </>
  );
});
