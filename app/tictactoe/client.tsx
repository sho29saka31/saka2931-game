"use client";
import { useState } from "react";
import { btn } from "../components/GameShell";

type Cell = "X" | "O" | null;
const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

const winner = (b: Cell[]): Cell => { for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]; return null; };

// CPU(O) 視点の minimax。勝ちは早く、負けは遅くなるよう深さで補正。
function minimax(b: Cell[], turn: "X" | "O", depth: number): number {
  const w = winner(b);
  if (w === "O") return 10 - depth;
  if (w === "X") return depth - 10;
  if (b.every(Boolean)) return 0;
  const scores = b.flatMap((v, i) => v ? [] : [minimax(b.map((x, j) => j === i ? turn : x), turn === "O" ? "X" : "O", depth + 1)]);
  return turn === "O" ? Math.max(...scores) : Math.min(...scores);
}

function cpuMove(b: Cell[]): number {
  let best = -Infinity, move = -1;
  b.forEach((v, i) => {
    if (v) return;
    const s = minimax(b.map((x, j) => j === i ? "O" : x), "X", 1);
    if (s > best) { best = s; move = i; }
  });
  return move;
}

export default function Client() {
  const [b, setB] = useState<Cell[]>(Array(9).fill(null));
  const [score, setScore] = useState({ win: 0, draw: 0, lose: 0 });
  const w = winner(b);
  const draw = !w && b.every(Boolean);
  const over = !!w || draw;

  const click = (i: number) => {
    if (b[i] || over) return;
    let next = b.map((v, j) => j === i ? "X" : v) as Cell[];
    if (!winner(next) && !next.every(Boolean)) next = next.map((v, j) => j === cpuMove(next) ? "O" : v) as Cell[];
    setB(next);
    const nw = winner(next);
    if (nw === "X") setScore((s) => ({ ...s, win: s.win + 1 }));
    else if (nw === "O") setScore((s) => ({ ...s, lose: s.lose + 1 }));
    else if (next.every(Boolean)) setScore((s) => ({ ...s, draw: s.draw + 1 }));
  };

  return (
    <div className="mx-auto max-w-xs">
      <p className="mb-3 text-sm text-gray-600">あなたは ✕(先攻)。 {score.win}勝 {score.draw}分 {score.lose}敗</p>
      <div className="grid grid-cols-3 gap-2">
        {b.map((v, i) => (
          <button key={i} onClick={() => click(i)} aria-label={`マス ${i + 1}`} className="flex aspect-square items-center justify-center rounded-lg border border-gray-300 bg-gray-50 text-4xl font-bold hover:bg-gray-100">
            {v === "X" ? "✕" : v === "O" ? "○" : ""}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="font-bold">{w === "X" ? "あなたの勝ち！" : w === "O" ? "CPU の勝ち" : draw ? "引き分け" : ""}</p>
        <button className={btn} onClick={() => setB(Array(9).fill(null))}>もう一度</button>
      </div>
    </div>
  );
}
