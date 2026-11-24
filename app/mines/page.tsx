import type { Metadata } from "next";
import { GameShell } from "../components/GameShell";
import Client from "./client";

export const metadata: Metadata = { title: "マインスイーパ" };
export default function Page() {
  return <GameShell slug="mines"><Client /></GameShell>;
}
