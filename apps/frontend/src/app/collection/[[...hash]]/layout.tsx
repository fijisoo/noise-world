import { metadataShared } from "../../../utils/metadata";
import { WagmiWrapper } from "../../../providers/WagmiWrapper";

export const metadata = metadataShared;

export default async function RootLayout({ children }: any) {
  return <WagmiWrapper>{children}</WagmiWrapper>;
}
