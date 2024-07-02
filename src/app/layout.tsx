import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/__component/Footer";
import Header from "@/components/__component/Header";
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DevMeets",
  description: "DevMeets - Connect, Learn, and Grow with Tech Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
