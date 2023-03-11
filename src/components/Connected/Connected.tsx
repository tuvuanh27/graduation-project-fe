import { memo } from "react";
import type Web3 from "web3";
import type { ProviderStringType } from "../../utils/types";
import Button from "../common/Button";

type ConnectedProps = {
  web3: Web3;
  account: string;
  providerString: ProviderStringType | undefined;
  handleChangeProvider: () => void;
  balance: string | undefined;
};

export const Connected = memo(
  ({
    account,
    web3,
    providerString,
    handleChangeProvider,
    balance,
  }: ConnectedProps) => {
    return (
      <>
        <ul>
          <li>Connected account: {account}</li>
          <li>Balance: {balance}</li>

          <li>Connected via {providerString}</li>
        </ul>

        <div className="mt-3">
          <Button onClick={() => signMessage({ web3, account })}>
            Sign Message
          </Button>
          <Button onClick={handleChangeProvider}>Change Provider</Button>
        </div>
      </>
    );
  }
);

type SignMessageParams = { web3: Web3; account: string };

const signMessage = async ({ web3, account }: SignMessageParams) => {
  try {
    // This will send a request to the wallet provider to sign a message
    const signature = await web3.eth.personal.sign(
      "Example message",
      account,
      ""
    );
    // The signature is returned, do with it what you will
    console.info(signature);
  } catch (e) {
    // This error means that user canceled the signature request
    console.warn(e);
  }
};
