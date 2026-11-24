"use client";
import { useState } from "react";
import { useBest } from "../components/useBest";

const HANDS = [["グー", "✊"], ["チョキ", "✌️"], ["パー", "🖐️"]] as const;

export default function Client() {
  const [last, setLast] = useState<{ me: number; cpu: number; r: "win" | "lose" | "draw" } | null>(null);
  const [streak, setStreak] = useState(0);
  const [tally, setTally] = useState({ win: 0, draw: 0, lose: 0 });
  const [best, submit] = useBest("janken-best");

  const play = (me: number) => {
    const cpu = Math.floor(Math.random() * 3);
    const r = me === cpu ? "draw" : (me - cpu + 3) % 3 === 2 ? "win" : "lose"; // グー0 < チョキ1 < パー2 の循環
    setLast({ me, cpu, r });
    setTally((t) => ({ ...t, [r]: t[r] + 1 }));
    if (r === "win") { setStreak((s) => { submit(s + 1); return s + 1; }); } else if (r === "lose") setStreak(0);
  };

  return (
    <div className="mx-auto max-w-sm text-center">
      <p className="mb-4 text-sm">連勝 <b className="text-lg">{streak}</b> / 最高連勝 <b>{best ?? 0}</b> / {tally.win}勝 {tally.draw}分 {tally.lose}敗</p>
      <div className="flex h-24 items-center justify-center gap-6 text-5xl">
        {last ? <><span aria-label="あなた">{HANDS[last.me][1]}</span><span className="text-xl">vs</span><span aria-label="CPU">{HANDS[last.cpu][1]}</span></> : <span className="text-base text-gray-500">手を選んでください</span>}
      </div>
      <p className="h-8 text-xl font-bold">{last ? { win: "勝ち！", lose: "負け…", draw: "あいこ" }[last.r] : ""}</p>
      <div className="mt-2 flex justify-center gap-3">
        {HANDS.map(([name, icon], i) => (
          <button key={name} onClick={() => play(i)} className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium hover:bg-gray-50"><span className="block text-3xl">{icon}</span>{name}</button>
        ))}
      </div>
    </div>
  );
}
