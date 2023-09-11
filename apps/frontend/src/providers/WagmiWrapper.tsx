"use client";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, sepolia } from "wagmi/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://ethereum-sepolia.blockpi.network/v1/rpc/public`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://endpoints.omniatech.io/v1/eth/sepolia/public`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://rpc.sepolia.org/`,
      }),
    }),
    jsonRpcProvider({
      rpc: () => ({
        http: `https://eth-sepolia.g.alchemy.com/v2/demo`,
      }),
    }),
  ],
  { rank: true, stallTimeout: 5000 } as any
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export const WagmiWrapper = ({ children }: any) => {
  return <WagmiConfig config={wagmiConfig as any}>{children}</WagmiConfig>;
};
