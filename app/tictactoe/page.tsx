import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "三目並べ" };
export default function Page() {
  return <GameShell slug="tictactoe"><Client /></GameShell>;
}
