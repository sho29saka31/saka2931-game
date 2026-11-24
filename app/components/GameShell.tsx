import Link from "next/link";
import { games } from "../games";
import { itemJsonLd } from "../lib/seo";

export function GameShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const g = games.find((x) => x.slug === slug)!;
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemJsonLd(g, "GameApplication")) }} />
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">← ゲーム一覧</Link>
      <h1 className="mt-3 text-2xl font-bold text-gray-900">{g.name}</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{g.description}</p>
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">{children}</div>
    </main>
  );
}

export const btn = "rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700";
