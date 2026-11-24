"use client";
import { useCallback, useEffect, useState } from "react";

/** ブラウザの localStorage に保存するハイスコア。lowerIsBetter なら小さい値が良い記録。 */
export function useBest(key: string, lowerIsBetter = false) {
  const [best, setBest] = useState<number | null>(null);
  useEffect(() => {
    const v = localStorage.getItem(key);
    if (v !== null) setBest(Number(v));
  }, [key]);
  const submit = useCallback((score: number) => {
    setBest((cur) => {
      const better = cur === null || (lowerIsBetter ? score < cur : score > cur);
      if (!better) return cur;
      localStorage.setItem(key, String(score));
      return score;
    });
  }, [key, lowerIsBetter]);
  return [best, submit] as const;
}
