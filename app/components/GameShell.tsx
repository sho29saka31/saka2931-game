import Link from "next/link";
import { categories, games } from "../games";
import { itemJsonLd } from "../lib/seo";

export function GameShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const g = games.find((x) => x.slug === slug)!;
  const cat = categories.find((c) => c.id === g.category)!;
  const siblings = games.filter((x) => x.category === g.category && x.slug !== slug);
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemJsonLd(g, "GameApplication")) }} />
      <nav className="font-mono text-xs text-gray-500">
        <Link href="/" className="hover:text-accent">game</Link> / {cat.name}
      </nav>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">{g.name}</h1>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{g.description}</p>
      <div className="mt-8 border-t border-gray-900 pt-6">{children}</div>
      {siblings.length > 0 && (
        <aside className="mt-16 border-t border-gray-200 pt-4">
          <h2 className="text-xs font-semibold text-gray-500">{cat.name}の他のゲーム</h2>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            {siblings.map((s) => <li key={s.slug}><Link href={`/${s.slug}`} className="text-gray-700 hover:text-accent">{s.name}</Link></li>)}
          </ul>
        </aside>
      )}
    </main>
  );
}

export const btn = "rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50";
