import "ui/styles.css";
import "../styles/globals.css";

import { dir } from "i18next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ApolloWrapper } from "../providers/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });
const teko = localFont({
  src: [
    {
      path: "../styles/fonts/Teko-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../styles/fonts/Teko-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../styles/fonts/Teko-Bold.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../styles/fonts/Teko-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../styles/fonts/Teko-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../styles/fonts/Teko-Variable.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-teko",
});

export const metadata = {
  title: "syncArt - keep your concert memories with you",
  description:
    "Scan qr code before the concert to receive a virtual stamp and access exclusives after the concert",
  icon: ["./favicon.ico"],
};

export default async function RootLayout({ children }: any) {
  return (
    <html lang="en" dir={dir("en")}>
      <body className={`${inter.className} ${teko.className}`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
