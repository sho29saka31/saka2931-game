import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "神経衰弱" };
export default function Page() {
  return <GameShell slug="memory"><Client /></GameShell>;
}
