export type Game = { slug: string; name: string; description: string; icon: string };

export const games: Game[] = [
  { slug: "g2048", name: "2048", description: "同じ数字を合わせて 2048 を目指す定番パズル(矢印キー/スワイプ)", icon: "🔢" },
  { slug: "memory", name: "神経衰弱", description: "絵柄のペアを最少手数で揃えよう", icon: "🃏" },
  { slug: "reaction", name: "反応速度テスト", description: "画面が変わった瞬間にクリック。あなたの反応は何ミリ秒？", icon: "⚡" },
];
