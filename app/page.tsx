import { pageMetadata } from "./lib/seo";
import { Catalog } from "./components/Catalog";
import { categories, games } from "./games";

export const metadata = pageMetadata({ title: "game - 無料のブラウザゲーム集", description: "ひと休みに遊べる小さなゲームを置いています。記録は、お使いのブラウザにだけ保存されます。", path: "/" });

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="font-mono text-xs text-accent">game.saka2931.jp</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">game</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600">ひと休みに遊べる小さなゲームを置いています。記録は、お使いのブラウザにだけ保存されます。</p>
      <div className="mt-10">
        <Catalog items={games} categories={categories} />
      </div>
    </main>
  );
}
