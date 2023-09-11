"use client";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, sepolia } from "wagmi/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://rpc2.sepolia.org/`,
      }),
    }),
  ],
  { rank: true } as any
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export const WagmiWrapper = ({ children }: any) => {
  return <WagmiConfig config={wagmiConfig as any}>{children}</WagmiConfig>;
};
