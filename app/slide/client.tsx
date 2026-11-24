"use client";
import { useEffect, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";

const N = 4;
const SOLVED = [...Array(N * N - 1).keys()].map((i) => i + 1).concat(0);
const neighbors = (i: number) => {
  const x = i % N, y = Math.floor(i / N), r: number[] = [];
  if (x > 0) r.push(i - 1); if (x < N - 1) r.push(i + 1); if (y > 0) r.push(i - N); if (y < N - 1) r.push(i + N);
  return r;
};
/** 完成形からランダムに動かして作る(必ず解ける配置になる) */
function shuffled(): number[] {
  let t = [...SOLVED], blank = t.indexOf(0), prev = -1;
  for (let k = 0; k < 300; k++) {
    const c = neighbors(blank).filter((n) => n !== prev);
    const n = c[Math.floor(Math.random() * c.length)];
    [t[blank], t[n]] = [t[n], t[blank]]; prev = blank; blank = n;
  }
  return t.every((v, i) => v === SOLVED[i]) ? shuffled() : t;
}

export default function Client() {
  const [tiles, setTiles] = useState<number[]>(SOLVED);
  const [moves, setMoves] = useState(0);
  const [best, submit] = useBest("slide-best", true);
  useEffect(() => { setTiles(shuffled()); }, []);
  const won = moves > 0 && tiles.every((v, i) => v === SOLVED[i]);
  useEffect(() => { if (won) submit(moves); }, [won, moves, submit]);

  const click = (i: number) => {
    if (won) return;
    const b = tiles.indexOf(0);
    if (!neighbors(b).includes(i)) return;
    const t = [...tiles]; [t[b], t[i]] = [t[i], t[b]];
    setTiles(t); setMoves((m) => m + 1);
  };
  const restart = () => { setTiles(shuffled()); setMoves(0); };

  return (
    <div className="mx-auto max-w-xs">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>手数 <b className="text-lg">{moves}</b> / ベスト <b>{best ?? "-"}</b></div>
        <button className={btn} onClick={restart}>シャッフル</button>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {tiles.map((v, i) => (
          <button key={i} onClick={() => click(i)} disabled={v === 0} aria-label={v ? `タイル ${v}` : "空きマス"}
            className={`aspect-square rounded-lg text-xl font-bold ${v ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-100"}`}>{v || ""}</button>
        ))}
      </div>
      {won && <p className="mt-4 text-center text-lg font-bold">クリア！ {moves} 手でした</p>}
    </div>
  );
}
