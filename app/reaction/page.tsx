import { GameShell } from "../components/GameShell";
import { games } from "../games";
import { itemMetadata } from "../lib/seo";
import Client from "./client";

const item = games.find((i) => i.slug === "reaction")!;
export const metadata = itemMetadata(item);

export default function Page() {
  return <GameShell slug="reaction"><Client /></GameShell>;
}
