"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** 制限時間つきゲーム用のカウントダウン。終了時に onEnd を呼ぶ(常に最新の state を参照できる)。 */
export function useCountdown(total: number, onEnd: () => void) {
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const endAt = useRef(0);
  const onEndRef = useRef(onEnd);
  useEffect(() => { onEndRef.current = onEnd; });

  const start = useCallback(() => { endAt.current = Date.now() + total * 1000; setLeft(total); setRunning(true); }, [total]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const ms = endAt.current - Date.now();
      setLeft(Math.max(0, Math.ceil(ms / 1000)));
      if (ms <= 0) { clearInterval(id); setRunning(false); onEndRef.current(); }
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  return { left, running, start };
}
