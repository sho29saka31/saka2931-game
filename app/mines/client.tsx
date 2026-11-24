"use client";
import { useEffect, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";

const W = 9, H = 9, M = 10;
type Cell = { mine: boolean; open: boolean; flag: boolean; n: number };
const blank = (): Cell[] => Array.from({ length: W * H }, () => ({ mine: false, open: false, flag: false, n: 0 }));
const around = (i: number) => {
  const x = i % W, y = Math.floor(i / W), r: number[] = [];
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const nx = x + dx, ny = y + dy;
    if ((dx || dy) && nx >= 0 && ny >= 0 && nx < W && ny < H) r.push(ny * W + nx);
  }
  return r;
};
const COLORS = ["", "text-blue-600", "text-green-600", "text-red-600", "text-purple-700", "text-amber-700", "text-cyan-700", "text-gray-900", "text-gray-500"];

export default function Client() {
  const [cells, setCells] = useState<Cell[]>(blank);
  const [phase, setPhase] = useState<"ready" | "play" | "won" | "lost">("ready");
  const [flagMode, setFlagMode] = useState(false);
  const [time, setTime] = useState(0);
  const [best, submit] = useBest("mines-best", true);

  useEffect(() => {
    if (phase !== "play") return;
    const t0 = Date.now() - time * 1000;
    const id = setInterval(() => setTime(Math.floor((Date.now() - t0) / 1000)), 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const reset = () => { setCells(blank()); setPhase("ready"); setTime(0); };

  const toggleFlag = (i: number) => {
    if (phase === "won" || phase === "lost" || cells[i].open) return;
    setCells((c) => c.map((x, j) => j === i ? { ...x, flag: !x.flag } : x));
  };

  const open = (i: number) => {
    if (phase === "won" || phase === "lost" || cells[i].open || cells[i].flag) return;
    let cs = cells.map((c) => ({ ...c }));
    if (phase === "ready") { // 最初の1手は必ず安全(周囲も地雷なし)
      const safe = new Set([i, ...around(i)]);
      const pool = cs.map((_, j) => j).filter((j) => !safe.has(j));
      for (let k = 0; k < M; k++) { const p = Math.floor(Math.random() * pool.length); cs[pool.splice(p, 1)[0]].mine = true; }
      cs.forEach((c, j) => { c.n = around(j).filter((a) => cs[a].mine).length; });
      setPhase("play");
    }
    if (cs[i].mine) {
      cs.forEach((c) => { if (c.mine) c.open = true; });
      setCells(cs); setPhase("lost"); return;
    }
    const stack = [i];
    while (stack.length) {
      const j = stack.pop()!;
      if (cs[j].open || cs[j].flag) continue;
      cs[j].open = true;
      if (cs[j].n === 0) stack.push(...around(j));
    }
    setCells(cs);
    if (cs.filter((c) => c.open).length === W * H - M) { setPhase("won"); submit(time); }
  };

  const flags = cells.filter((c) => c.flag).length;
  return (
    <div className="mx-auto" style={{ maxWidth: 360 }}>
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>地雷 <b>{M - flags}</b> / 時間 <b>{time}</b>秒 / ベスト <b>{best ?? "-"}</b></div>
        <button className={btn} onClick={reset}>最初から</button>
      </div>
      <div className="grid grid-cols-9 gap-1" onContextMenu={(e) => e.preventDefault()}>
        {cells.map((c, i) => (
          <button key={i} onClick={() => (flagMode ? toggleFlag(i) : open(i))} onContextMenu={() => toggleFlag(i)}
            aria-label={`マス ${i + 1}`}
            className={`flex aspect-square items-center justify-center rounded text-sm font-bold ${c.open ? (c.mine ? "bg-red-200" : "bg-gray-100") : "bg-gray-300 hover:bg-gray-400"} ${COLORS[c.n]}`}>
            {c.open ? (c.mine ? "💣" : c.n || "") : c.flag ? "🚩" : ""}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={flagMode} onChange={(e) => setFlagMode(e.target.checked)} />旗モード(スマホ向け)</label>
        <p className="font-bold">{phase === "won" ? "クリア！" : phase === "lost" ? "ゲームオーバー" : ""}</p>
      </div>
      <p className="mt-2 text-xs text-gray-500">PC は右クリックでも旗を立てられます。最初の1手は必ず安全です。</p>
    </div>
  );
}
