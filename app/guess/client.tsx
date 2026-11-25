"use client";
import { useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";

const secret = () => Math.floor(Math.random() * 100) + 1;

export default function Client() {
  const [answer, setAnswer] = useState(secret);
  const [value, setValue] = useState("");
  const [log, setLog] = useState<{ n: number; hint: string }[]>([]);
  const [won, setWon] = useState(false);
  const [best, submit] = useBest("guess-best", true);

  const submitGuess = (e: React.FormEvent) => {
    e.preventDefault();
    const n = Number(value);
    if (won || !Number.isInteger(n) || n < 1 || n > 100) return;
    const hint = n === answer ? "正解！" : n < answer ? "もっと大きい" : "もっと小さい";
    setLog((l) => [{ n, hint }, ...l]);
    setValue("");
    if (n === answer) { setWon(true); submit(log.length + 1); }
  };
  const reset = () => { setAnswer(secret()); setLog([]); setWon(false); setValue(""); };

  return (
    <div className="mx-auto max-w-sm">
      <p className="mb-3 text-sm">回数 <b className="text-lg">{log.length}</b> / ベスト <b>{best ?? "-"}</b> 回</p>
      <form onSubmit={submitGuess} className="flex gap-2">
        <input type="number" min={1} max={100} inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} disabled={won} placeholder="1〜100" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <button className={btn} disabled={won}>予想</button>
      </form>
      <ul className="mt-4 space-y-1 text-sm">
        {log.map((l, i) => <li key={i} className="flex justify-between rounded bg-gray-50 px-3 py-1"><span>{l.n}</span><b>{l.hint}</b></li>)}
      </ul>
      {won && <div className="mt-4 flex items-center justify-between"><p className="font-bold">{log.length} 回でクリア！</p><button className={btn} onClick={reset}>もう一度</button></div>}
    </div>
  );
}
