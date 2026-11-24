import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "反応速度テスト" };
export default function Page() {
  return <GameShell slug="reaction"><Client /></GameShell>;
}
