import "./../../styles/output.css";

import { dir } from "i18next";
import { ApolloWrapper } from "../../providers/ApolloWrapper";
import { Analytics } from "@vercel/analytics/react";
import { metadataShared } from "../../utils/metadata";
import { inter, teko } from "../../utils/fonts";

export const metadata = metadataShared;

export default async function RootLayout({ children, params }: any) {
  return (
    <html lang={params?.lang} dir={dir(params?.lang)}>
      <body className={`${inter.className} ${teko.className}`}>
        <Analytics />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
