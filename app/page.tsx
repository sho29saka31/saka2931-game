import Link from "next/link";
import { games } from "./games";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Saka Games</h1>
      <p className="mt-2 text-slate-400">登録不要・無料。ブラウザですぐ遊べるミニゲーム集です。</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {games.map((g) => (
          <Link key={g.slug} href={`/${g.slug}`} className="rounded-xl border border-slate-700 bg-slate-800 p-5 transition hover:border-slate-400">
            <div className="text-3xl">{g.icon}</div>
            <h2 className="mt-2 font-semibold">{g.name}</h2>
            <p className="mt-1 text-sm text-slate-400">{g.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
