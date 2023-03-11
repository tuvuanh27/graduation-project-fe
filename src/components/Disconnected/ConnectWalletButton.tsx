import { memo } from "react";
import type { ProviderStringType } from "../../utils/types";
import Button from "../common/Button";

type ConnectWalletButtonProps = {
  providerString: ProviderStringType;
  handleConnect: (selectedProvider: ProviderStringType) => Promise<void>;
  text: string;
  color?: string;
};

export const ConnectWalletButton = memo(
  ({
    providerString,
    handleConnect,
    text,
    color = "blue",
  }: ConnectWalletButtonProps) => (
    <Button onClick={() => handleConnect(providerString)} bgColor={color}>
      {text}
    </Button>
  )
);
