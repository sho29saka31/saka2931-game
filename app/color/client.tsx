"use client";
import { useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";
import { useCountdown } from "../components/useCountdown";

const COLORS = [
  { name: "赤", css: "#dc2626" }, { name: "青", css: "#2563eb" }, { name: "緑", css: "#16a34a" }, { name: "黄", css: "#ca8a04" },
] as const;
const rnd = () => Math.floor(Math.random() * COLORS.length);
// 文字の意味と表示色が必ず食い違う問題を出す
function make() { const word = rnd(); let ink; do ink = rnd(); while (ink === word); return { word, ink }; }

export default function Client() {
  const [q, setQ] = useState(make);
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState(0);
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [best, submit] = useBest("color-best");
  const { left, start } = useCountdown(30, () => { setPhase("over"); submit(score); });

  const begin = () => { setScore(0); setMiss(0); setQ(make()); setPhase("play"); start(); };
  const answer = (i: number) => {
    if (phase !== "play") return;
    if (i === q.ink) setScore((s) => s + 1); else setMiss((m) => m + 1);
    setQ(make());
  };

  return (
    <div className="mx-auto max-w-sm">
      <p className="mb-3 text-sm text-gray-600">文字の「色」と同じボタンを押してください(文字の意味ではありません)。</p>
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>正解 <b className="text-lg">{score}</b> / ミス {miss} / ベスト <b>{best ?? 0}</b></div>
        <div>残り <b className="text-lg">{phase === "idle" ? 30 : left}</b> 秒</div>
      </div>
      <div className="rounded-md border border-gray-200 bg-gray-50 py-8 text-center text-5xl font-bold" style={{ color: phase === "play" ? COLORS[q.ink].css : "#111827" }}>
        {phase === "play" ? COLORS[q.word].name : phase === "over" ? "終了！" : "準備はOK？"}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {COLORS.map((c, i) => <button key={c.name} onClick={() => answer(i)} disabled={phase !== "play"} className="rounded-md border border-gray-300 py-3 text-sm font-bold hover:bg-gray-50 disabled:opacity-50">{c.name}</button>)}
      </div>
      {phase !== "play" && <button className={`${btn} mt-4`} onClick={begin}>{phase === "over" ? `${score} 問正解！もう一度` : "スタート"}</button>}
    </div>
  );
}
