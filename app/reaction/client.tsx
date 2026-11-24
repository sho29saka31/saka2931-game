"use client";
import { useEffect, useRef, useState } from "react";
import { useBest } from "../components/useBest";

type Phase = "idle" | "waiting" | "go" | "early" | "result";

export default function Client() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [ms, setMs] = useState(0);
  const [best, submit] = useBest("reaction-best", true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const startedAt = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const click = () => {
    if (phase === "idle" || phase === "early" || phase === "result") {
      setPhase("waiting");
      timer.current = setTimeout(() => { startedAt.current = performance.now(); setPhase("go"); }, 1500 + Math.random() * 3000);
    } else if (phase === "waiting") {
      clearTimeout(timer.current);
      setPhase("early");
    } else if (phase === "go") {
      const t = Math.round(performance.now() - startedAt.current);
      setMs(t); submit(t); setPhase("result");
    }
  };

  const view: Record<Phase, { bg: string; text: string }> = {
    idle: { bg: "bg-indigo-600", text: "クリックでスタート" },
    waiting: { bg: "bg-red-600", text: "緑になるまで待って…" },
    go: { bg: "bg-green-500", text: "今！クリック！" },
    early: { bg: "bg-slate-600", text: "早すぎました。クリックでやり直し" },
    result: { bg: "bg-indigo-600", text: `${ms} ms — クリックでもう一度` },
  };
  return (
    <>
      <button onClick={click} className={`flex h-64 w-full select-none items-center justify-center rounded-xl text-xl font-bold ${view[phase].bg}`}>
        {view[phase].text}
      </button>
      <p className="mt-3 text-sm text-slate-400">自己ベスト: <b>{best === null ? "-" : `${best} ms`}</b></p>
    </>
  );
}
