"use client";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export const WagmiWrapper = ({ children }: any) => {
  console.log("network", wagmiConfig);
  return <WagmiConfig config={wagmiConfig as any}>{children}</WagmiConfig>;
};
