import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Saka Games", template: "%s | Saka Games" },
  description: "ブラウザですぐ遊べる、無料のミニゲーム集",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-900 text-slate-100">
        <header className="border-b border-slate-700">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold">🎮 Saka Games</Link>
            <a href="https://tool.saka2931.jp" className="text-sm text-slate-400 hover:text-white">ツールはこちら →</a>
          </div>
        </header>
        <main className="mx-auto max-w-3xl px-6 py-8">{children}</main>
        <footer className="mx-auto max-w-3xl px-6 py-8 text-sm text-slate-500">
          ハイスコアはお使いのブラウザ内にのみ保存されます。
        </footer>
      </body>
    </html>
  );
}
