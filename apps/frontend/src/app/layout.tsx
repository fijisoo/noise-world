import "ui/styles.css";
import "./../styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ApolloWrapper } from "../providers/ApolloWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const delay = Number(
    cookieStore.get("apollo-x-custom-delay" as any)?.value ?? 1000
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper delay={delay}>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
