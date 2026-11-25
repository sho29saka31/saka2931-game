"use client";
import { useEffect, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";

const N = 5;
const press = (b: boolean[], i: number) => {
  const x = i % N, y = Math.floor(i / N), n = [...b];
  for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
    const nx = x + dx, ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < N && ny < N) n[ny * N + nx] = !n[ny * N + nx];
  }
  return n;
};
/** 全消灯からランダムに押して作る(必ず解ける) */
function make() {
  let b: boolean[] = Array(N * N).fill(false);
  do { for (let k = 0; k < 12; k++) b = press(b, Math.floor(Math.random() * N * N)); } while (b.every((v) => !v));
  return b;
}

export default function Client() {
  const [b, setB] = useState<boolean[]>(Array(N * N).fill(false));
  const [moves, setMoves] = useState(0);
  const [best, submit] = useBest("lights-best", true);
  useEffect(() => { setB(make()); }, []);
  const won = moves > 0 && b.every((v) => !v);
  useEffect(() => { if (won) submit(moves); }, [won, moves, submit]);

  return (
    <div className="mx-auto max-w-xs">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>手数 <b className="text-lg">{moves}</b> / ベスト <b>{best ?? "-"}</b></div>
        <button className={btn} onClick={() => { setB(make()); setMoves(0); }}>新しい盤面</button>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {b.map((on, i) => (
          <button key={i} aria-label={`マス ${i + 1} ${on ? "点灯" : "消灯"}`} aria-pressed={on}
            onClick={() => { if (!won) { setB(press(b, i)); setMoves((m) => m + 1); } }}
            className={`aspect-square rounded-md border ${on ? "border-amber-500 bg-amber-300" : "border-gray-300 bg-gray-800"}`} />
        ))}
      </div>
      {won && <p className="mt-4 text-center text-lg font-bold">全部消せた！ {moves} 手でした</p>}
    </div>
  );
}
