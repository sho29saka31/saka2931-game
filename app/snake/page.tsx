import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "スネーク" };
export default function Page() {
  return <GameShell slug="snake"><Client /></GameShell>;
}
