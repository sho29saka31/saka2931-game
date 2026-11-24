"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";
import { addRandom, type Board, type Dir, isOver, move, newGame } from "./logic";

const COLORS: Record<number, string> = {
  0: "bg-gray-100", 2: "bg-amber-100 text-gray-800", 4: "bg-amber-200 text-gray-800", 8: "bg-orange-300 text-gray-900",
  16: "bg-orange-400 text-white", 32: "bg-orange-500 text-white", 64: "bg-red-500 text-white", 128: "bg-yellow-400 text-gray-900",
  256: "bg-yellow-500 text-gray-900", 512: "bg-lime-500 text-gray-900", 1024: "bg-emerald-500 text-white", 2048: "bg-sky-500 text-white",
};

export default function Client() {
  const [board, setBoard] = useState<Board | null>(null);
  const [score, setScore] = useState(0);
  const [best, submit] = useBest("g2048-best");
  const touch = useRef<[number, number] | null>(null);

  useEffect(() => { setBoard(newGame()); }, []);

  const play = useCallback((dir: Dir) => {
    setBoard((b) => {
      if (!b) return b;
      const r = move(b, dir);
      if (!r.moved) return b;
      setScore((s) => { const n = s + r.gained; submit(n); return n; });
      return addRandom(r.board);
    });
  }, [submit]);

  useEffect(() => {
    const keys: Record<string, Dir> = { ArrowLeft: "left", ArrowUp: "up", ArrowRight: "right", ArrowDown: "down" };
    const onKey = (e: KeyboardEvent) => { const d = keys[e.key]; if (d) { e.preventDefault(); play(d); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  const restart = () => { setBoard(newGame()); setScore(0); };
  const over = board ? isOver(board) : false;

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>スコア <b className="text-lg">{score}</b> / ベスト <b>{best ?? 0}</b></div>
        <button className={btn} onClick={restart}>最初から</button>
      </div>
      <div
        className="relative grid touch-none grid-cols-4 gap-2 rounded-xl bg-gray-200 p-2"
        onTouchStart={(e) => { const t = e.touches[0]; touch.current = [t.clientX, t.clientY]; }}
        onTouchEnd={(e) => {
          if (!touch.current) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - touch.current[0], dy = t.clientY - touch.current[1];
          touch.current = null;
          if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
          play(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
        }}
      >
        {(board ?? Array.from({ length: 4 }, () => Array(4).fill(0))).flat().map((v, i) => (
          <div key={i} className={`flex aspect-square items-center justify-center rounded-lg text-2xl font-bold ${COLORS[v] ?? "bg-fuchsia-600 text-white"}`}>
            {v || ""}
          </div>
        ))}
        {over && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-white/85">
            <div className="text-2xl font-bold">ゲームオーバー</div>
            <button className={btn} onClick={restart}>もう一度</button>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs text-gray-500">PC は矢印キー、スマホはスワイプで操作します。</p>
    </div>
  );
}
