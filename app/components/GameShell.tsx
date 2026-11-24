import Link from "next/link";
import { games } from "../games";

export function GameShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const g = games.find((x) => x.slug === slug)!;
  return (
    <>
      <Link href="/" className="text-sm text-slate-400 hover:text-white">← ゲーム一覧</Link>
      <h1 className="mt-2 text-2xl font-bold">{g.icon} {g.name}</h1>
      <p className="mt-1 text-slate-400">{g.description}</p>
      <div className="mt-6">{children}</div>
    </>
  );
}

export const btn = "rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400";
