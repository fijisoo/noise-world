import "ui/styles.css";
import "./../../styles/globals.css";

import { dir } from "i18next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { ApolloWrapper } from "../../providers/ApolloWrapper";
import { site } from "../../../config/site";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const teko = localFont({
  src: [
    {
      path: "../../styles/fonts/Teko-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../styles/fonts/Teko-SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../styles/fonts/Teko-Bold.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../styles/fonts/Teko-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../styles/fonts/Teko-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../styles/fonts/Teko-Variable.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-teko",
});

export const metadata = {
  title: site.title,
  description: site.description,
  icon: ["./favicon.ico"],
  keywords: [
    "art",
    "concert",
    "web3",
    "decentralization",
    "festival",
    "streaming services",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sync.art/og-syncart.png",
    title: site.name,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
    creator: "@fijisoo",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

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
