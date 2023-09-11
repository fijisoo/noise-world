import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { sepolia } from "wagmi/chains";

export const useConnectWallet = () => {
  const { address, isConnected, status } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    chainId: sepolia.id,
  });
  const { disconnect } = useDisconnect();

  return { connect, disconnect, address, isConnected, status };
};
