export type Game = { slug: string; name: string; description: string; icon: string };

export const games: Game[] = [
  { slug: "g2048", name: "2048", description: "同じ数字を合わせて 2048 を目指す定番パズル(矢印キー/スワイプ)", icon: "🔢" },
  { slug: "memory", name: "神経衰弱", description: "絵柄のペアを最少手数で揃えよう", icon: "🃏" },
  { slug: "reaction", name: "反応速度テスト", description: "画面が変わった瞬間にクリック。あなたの反応は何ミリ秒？", icon: "⚡" },
  { slug: "tictactoe", name: "三目並べ", description: "CPU と対戦する〇×ゲーム。CPU は強いので引き分けを狙おう", icon: "" },
  { slug: "snake", name: "スネーク", description: "エサを食べて伸びるヘビを操作。壁や自分にぶつからないように", icon: "" },
  { slug: "guess", name: "数当て", description: "1〜100 の秘密の数字を、ヒントを頼りに最少回数で当てよう", icon: "" },
  { slug: "mines", name: "マインスイーパ", description: "9×9 のマスから地雷を避けて全てのマスを開こう", icon: "" },
];
