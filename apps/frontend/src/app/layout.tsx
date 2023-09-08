import "../styles/output.css";

import { dir } from "i18next";
import { Analytics } from "@vercel/analytics/react";
import { metadataShared } from "../utils/metadata";
import { inter, teko } from "../utils/fonts";
import { ApolloWrapper } from "../providers/ApolloWrapper";

export const metadata = metadataShared;

export default async function RootLayout({ children }: any) {
  return (
    <html lang="en" dir={dir("en")}>
      <body className={`${inter.className} ${teko.className}`}>
        <Analytics />
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
