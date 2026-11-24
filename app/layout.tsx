import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://game.saka2931.jp"),
  title: { default: "Saka Games | saka2931.jp", template: "%s | Saka Games" },
  description: "ブラウザですぐ遊べる、無料のミニゲーム集",
  applicationName: "Saka Games",
  openGraph: { siteName: "Saka Games", locale: "ja_JP", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
