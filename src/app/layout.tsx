import type { Metadata } from "next";
import { CSSProperties } from "react";
import { Outfit } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Director from "../components/Director";
import CookieBanner from "../components/CookieBanner/CookieBanner";
import "./globals.css";

const outfit = Outfit({
  variable: "--fnt",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HEK Gebäudemanagement GmbH",
  description: "HEK Gebäudemanagement GmbH Website",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const containerStyle: CSSProperties = {
    width: '100%',
      minHeight: '100vh'
  };

  return (
    <html lang="de" className={outfit.variable}>
      <body>
        <Header className="shiftable" />
        <Director
          as="main"
          id="app-container" 
          className="shiftable"
          style={containerStyle}
        >
          {children}
        </Director>
        <Footer className="shiftable" />
        <CookieBanner />
        {modal}
      </body>
    </html>
  );
}
