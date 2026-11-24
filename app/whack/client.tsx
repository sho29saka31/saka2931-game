"use client";
import { useEffect, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";
import { useCountdown } from "../components/useCountdown";

export default function Client() {
  const [mole, setMole] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [best, submit] = useBest("whack-best");
  const { left, start } = useCountdown(30, () => { setPhase("over"); setMole(null); submit(score); });

  // もぐらは一定間隔で別の穴へ移動する
  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => setMole((cur) => { let n; do n = Math.floor(Math.random() * 9); while (n === cur); return n; }), 750);
    return () => clearInterval(id);
  }, [phase]);

  const begin = () => { setScore(0); setMole(4); setPhase("play"); start(); };
  const hit = (i: number) => { if (phase === "play" && i === mole) { setScore((s) => s + 1); setMole(null); } };

  return (
    <div className="mx-auto max-w-xs">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>スコア <b className="text-lg">{score}</b> / ベスト <b>{best ?? 0}</b></div>
        <div>残り <b className="text-lg">{phase === "idle" ? 30 : left}</b> 秒</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, i) => (
          <button key={i} onClick={() => hit(i)} aria-label={i === mole ? "もぐら" : "穴"} className="flex aspect-square items-center justify-center rounded-full bg-amber-900/80 text-4xl">
            {i === mole ? "🐹" : ""}
          </button>
        ))}
      </div>
      {phase !== "play" && <button className={`${btn} mt-4`} onClick={begin}>{phase === "over" ? `${score} 匹！もう一度` : "スタート"}</button>}
    </div>
  );
}
