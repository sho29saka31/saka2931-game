"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";

const N = 20, CELL = 16;
type P = { x: number; y: number };
const DIRS: Record<string, P> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
const KEYS: Record<string, string> = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };

const randomFood = (snake: P[]): P => {
  for (;;) {
    const f = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) };
    if (!snake.some((p) => p.x === f.x && p.y === f.y)) return f;
  }
};

export default function Client() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const g = useRef({ snake: [{ x: 10, y: 10 }] as P[], dir: DIRS.right, next: DIRS.right, food: { x: 5, y: 5 }, score: 0 });
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [best, submit] = useBest("snake-best");

  const draw = useCallback(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#f3f4f6"; ctx.fillRect(0, 0, N * CELL, N * CELL);
    ctx.fillStyle = "#dc2626"; ctx.fillRect(g.current.food.x * CELL + 2, g.current.food.y * CELL + 2, CELL - 4, CELL - 4);
    g.current.snake.forEach((p, i) => { ctx.fillStyle = i === 0 ? "#111827" : "#4b5563"; ctx.fillRect(p.x * CELL + 1, p.y * CELL + 1, CELL - 2, CELL - 2); });
  }, []);

  const start = () => {
    g.current = { snake: [{ x: 10, y: 10 }], dir: DIRS.right, next: DIRS.right, food: randomFood([{ x: 10, y: 10 }]), score: 0 };
    setScore(0); setPhase("play"); draw();
  };

  const turn = useCallback((name: string) => {
    const d = DIRS[name], cur = g.current.dir;
    if (d.x + cur.x === 0 && d.y + cur.y === 0) return; // 逆走は不可
    g.current.next = d;
  }, []);

  useEffect(() => {
    if (phase !== "play") return;
    const id = setInterval(() => {
      const s = g.current;
      s.dir = s.next;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      const hit = head.x < 0 || head.y < 0 || head.x >= N || head.y >= N || s.snake.some((p) => p.x === head.x && p.y === head.y);
      if (hit) { setPhase("over"); submit(s.score); return; }
      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) { s.score++; setScore(s.score); s.food = randomFood(s.snake); }
      else s.snake.pop();
      draw();
    }, 110);
    return () => clearInterval(id);
  }, [phase, draw, submit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { const k = KEYS[e.key]; if (k) { e.preventDefault(); turn(k); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  useEffect(draw, [draw]);

  return (
    <div className="mx-auto" style={{ width: N * CELL }}>
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>スコア <b className="text-lg">{score}</b> / ベスト <b>{best ?? 0}</b></div>
        <button className={btn} onClick={start}>{phase === "play" ? "最初から" : phase === "over" ? "もう一度" : "スタート"}</button>
      </div>
      <canvas ref={canvas} width={N * CELL} height={N * CELL} className="rounded-lg border border-gray-300" />
      {phase === "over" && <p className="mt-2 font-bold">ゲームオーバー</p>}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center sm:hidden">
        <span /><button className={btn} onClick={() => turn("up")}>↑</button><span />
        <button className={btn} onClick={() => turn("left")}>←</button><button className={btn} onClick={() => turn("down")}>↓</button><button className={btn} onClick={() => turn("right")}>→</button>
      </div>
      <p className="mt-3 text-xs text-gray-500">矢印キー / WASD で操作(スマホは下のボタン)。</p>
    </div>
  );
}
