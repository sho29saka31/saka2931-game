import Link from "next/link";
import { pageMetadata } from "./lib/seo";
import { games } from "./games";

export const metadata = pageMetadata({ title: "ゲーム一覧", description: "登録不要・無料で遊べるミニゲーム集。ハイスコアはブラウザ内にのみ保存されます。", path: "/" });

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Saka Games</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">
        登録不要・無料で遊べるミニゲーム集です。ハイスコアはお使いのブラウザ内にのみ保存されます。
      </p>
      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">ゲーム一覧</h2>
        <div className="mt-3 space-y-3">
          {games.map((g) => (
            <Link key={g.slug} href={`/${g.slug}`} className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-xs">
              <p className="font-medium text-gray-900">{g.name}</p>
              <p className="mt-1 text-sm text-gray-500">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
