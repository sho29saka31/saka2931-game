import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "2048" };
export default function Page() {
  return <GameShell slug="g2048"><Client /></GameShell>;
}
