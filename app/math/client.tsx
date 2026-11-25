"use client";
import { useRef, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";
import { useCountdown } from "../components/useCountdown";

const r = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
function question() {
  const op = ["+", "-", "×"][r(0, 2)];
  if (op === "×") { const a = r(2, 12), b = r(2, 12); return { text: `${a} × ${b}`, ans: a * b }; }
  if (op === "-") { const a = r(10, 99), b = r(1, a); return { text: `${a} − ${b}`, ans: a - b }; }
  const a = r(10, 99), b = r(10, 99); return { text: `${a} + ${b}`, ans: a + b };
}

export default function Client() {
  const [q, setQ] = useState(question);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [best, submit] = useBest("math-best");
  const input = useRef<HTMLInputElement>(null);
  const { left, start } = useCountdown(60, () => { setPhase("over"); submit(score); });

  const begin = () => { setScore(0); setMiss(0); setValue(""); setQ(question()); setPhase("play"); start(); setTimeout(() => input.current?.focus(), 0); };
  const answer = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "play" || value.trim() === "") return;
    if (Number(value) === q.ans) setScore((s) => s + 1); else setMiss((m) => m + 1);
    setValue(""); setQ(question());
  };

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>正解 <b className="text-lg">{score}</b> / ミス {miss} / ベスト <b>{best ?? 0}</b></div>
        <div>残り <b className="text-lg">{phase === "idle" ? 60 : left}</b> 秒</div>
      </div>
      <div className="rounded-md border border-gray-200 bg-gray-50 py-8 text-center text-4xl font-bold">{phase === "play" ? q.text : phase === "over" ? "終了！" : "準備はOK？"}</div>
      <form onSubmit={answer} className="mt-3 flex gap-2">
        <input ref={input} type="number" inputMode="numeric" value={value} onChange={(e) => setValue(e.target.value)} disabled={phase !== "play"} placeholder="答え" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
        <button className={btn} disabled={phase !== "play"}>回答</button>
      </form>
      {phase !== "play" && <button className={`${btn} mt-4`} onClick={begin}>{phase === "over" ? `${score} 問正解！もう一度` : "スタート"}</button>}
    </div>
  );
}
