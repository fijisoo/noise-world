import localFont from "next/font/local";
import {Inter} from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const teko = localFont({
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