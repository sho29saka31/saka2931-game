"use client";
import { useRef, useState } from "react";
import { btn } from "../components/GameShell";
import { useBest } from "../components/useBest";
import { useCountdown } from "../components/useCountdown";

const WORDS = ["apple", "banana", "orange", "computer", "keyboard", "internet", "website", "program", "network", "browser", "window", "button", "screen", "mouse", "garden", "flower", "river", "mountain", "ocean", "forest", "winter", "summer", "spring", "autumn", "morning", "evening", "friend", "family", "school", "teacher", "student", "music", "movie", "travel", "station", "bicycle", "airplane", "rocket", "planet", "galaxy", "energy", "future", "memory", "puzzle", "answer", "question", "challenge", "victory", "dragon", "castle"];
const pick = (prev?: string) => { let w; do w = WORDS[Math.floor(Math.random() * WORDS.length)]; while (w === prev); return w; };

export default function Client() {
  const [word, setWord] = useState(() => pick());
  const [typed, setTyped] = useState("");
  const [count, setCount] = useState(0);
  const [chars, setChars] = useState(0);
  const [phase, setPhase] = useState<"idle" | "play" | "over">("idle");
  const [best, submit] = useBest("typing-best");
  const input = useRef<HTMLInputElement>(null);
  const { left, start } = useCountdown(60, () => { setPhase("over"); submit(count); });

  const begin = () => { setCount(0); setChars(0); setTyped(""); setWord(pick()); setPhase("play"); start(); setTimeout(() => input.current?.focus(), 0); };
  const change = (v: string) => {
    if (phase !== "play") return;
    const t = v.toLowerCase();
    if (t === word) { setCount((c) => c + 1); setChars((c) => c + word.length); setTyped(""); setWord(pick(word)); }
    else setTyped(t);
  };
  const ok = word.startsWith(typed);

  return (
    <div className="mx-auto max-w-sm">
      <div className="mb-3 flex items-center justify-between text-sm">
        <div>単語 <b className="text-lg">{count}</b> / ベスト <b>{best ?? 0}</b></div>
        <div>残り <b className="text-lg">{phase === "idle" ? 60 : left}</b> 秒</div>
      </div>
      <div className="rounded-md border border-gray-200 bg-gray-50 py-8 text-center font-mono text-4xl font-bold tracking-wide">
        {phase === "play" ? <><span className="text-green-600">{word.slice(0, typed.length)}</span>{word.slice(typed.length)}</> : phase === "over" ? "終了！" : "準備はOK？"}
      </div>
      <input ref={input} value={typed} onChange={(e) => change(e.target.value)} disabled={phase !== "play"} autoCapitalize="none" autoCorrect="off" spellCheck={false}
        placeholder="ここに入力" className={`mt-3 w-full rounded-md border px-3 py-2 font-mono text-sm ${ok ? "border-gray-300" : "border-red-500 bg-red-50"}`} />
      {phase === "over" && <p className="mt-3 text-sm text-gray-600">{count} 単語 / {chars} 文字(1分あたり約 {chars} 文字)</p>}
      {phase !== "play" && <button className={`${btn} mt-4`} onClick={begin}>{phase === "over" ? "もう一度" : "スタート"}</button>}
    </div>
  );
}
