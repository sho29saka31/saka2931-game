"use client";
import { useEffect, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";

const ICONS = ["🍎", "🍌", "🍇", "🍓", "🍑", "🍋", "🥝", "🍉"];

function deal() {
  const cards = [...ICONS, ...ICONS].map((icon, id) => ({ id, icon }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function Client() {
  const [cards, setCards] = useState<{ id: number; icon: string }[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const [best, submit] = useBest("memory-best", true);

  useEffect(() => { setCards(deal()); }, []);

  const finished = cards.length > 0 && matched.size === cards.length;
  useEffect(() => { if (finished) submit(moves); }, [finished, moves, submit]);

  const flip = (idx: number) => {
    if (open.length === 2 || open.includes(idx) || matched.has(idx)) return;
    const next = [...open, idx];
    setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      if (cards[a].icon === cards[b].icon) {
        setMatched((s) => new Set([...s, a, b]));
        setOpen([]);
      } else {
        setTimeout(() => setOpen([]), 700);
      }
    }
  };
  const restart = () => { setCards(deal()); setOpen([]); setMatched(new Set()); setMoves(0); };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>手数 <b className="text-lg">{moves}</b> / ベスト <b>{best ?? "-"}</b></div>
        <button className={btn} onClick={restart}>最初から</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((c, i) => {
          const shown = open.includes(i) || matched.has(i);
          return (
            <button key={c.id} onClick={() => flip(i)} aria-label={shown ? c.icon : "裏向きのカード"}
              className={`flex aspect-square items-center justify-center rounded-md text-3xl transition ${shown ? "bg-gray-100 border border-gray-300" : "bg-gray-800 hover:bg-gray-700"} ${matched.has(i) ? "opacity-50" : ""}`}>
              {shown ? c.icon : ""}
            </button>
          );
        })}
      </div>
      {finished && <p className="mt-4 text-center text-lg font-bold">クリア。{moves} 手でした</p>}
    </div>
  );
}
