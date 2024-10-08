import { site } from "../../config/site";

export const metadataShared = {
  title: site.title,
  description: site.description,
  icon: ["./icon.ico"],
  keywords: [
    "art",
    "nft",
    "event",
    "web3",
    "decentralization",
    "festival",
    "streaming services",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.ogImage,
    title: site.name,
    description: site.description,
    siteName: site.name,
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
    creator: "@fijisoo",
  },
  icons: {
    icon: "https://sync.art/icon.ico",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};
