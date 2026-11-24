import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "数当て" };
export default function Page() {
  return <GameShell slug="guess"><Client /></GameShell>;
}
