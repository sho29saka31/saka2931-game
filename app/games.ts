export type Game = { slug: string; name: string; description: string; icon: string };

export const games: Game[] = [
  { slug: "g2048", name: "2048", description: "同じ数字を合わせて 2048 を目指す定番パズル(矢印キー/スワイプ)", icon: "🔢" },
  { slug: "memory", name: "神経衰弱", description: "絵柄のペアを最少手数で揃えよう", icon: "🃏" },
  { slug: "reaction", name: "反応速度テスト", description: "画面が変わった瞬間にクリック。あなたの反応は何ミリ秒？", icon: "⚡" },
  { slug: "tictactoe", name: "三目並べ", description: "CPU と対戦する〇×ゲーム。CPU は強いので引き分けを狙おう", icon: "" },
  { slug: "snake", name: "スネーク", description: "エサを食べて伸びるヘビを操作。壁や自分にぶつからないように", icon: "" },
  { slug: "guess", name: "数当て", description: "1〜100 の秘密の数字を、ヒントを頼りに最少回数で当てよう", icon: "" },
  { slug: "mines", name: "マインスイーパ", description: "9×9 のマスから地雷を避けて全てのマスを開こう", icon: "" },
  { slug: "slide", name: "スライドパズル", description: "1〜15 のタイルを動かして順番に並べる15パズル。最少手数に挑戦", icon: "" },
  { slug: "lights", name: "ライトアウト", description: "5×5 の明かりをすべて消そう。押したマスと上下左右が反転します", icon: "" },
  { slug: "math", name: "暗算チャレンジ", description: "60秒間で何問解ける？ 足し算・引き算・かけ算のスピード暗算", icon: "" },
  { slug: "whack", name: "もぐらたたき", description: "穴から顔を出すもぐらを30秒間でできるだけ多くたたこう", icon: "" },
  { slug: "typing", name: "タイピング", description: "英単語を60秒間でいくつ打てるかに挑戦。キーボード練習にも", icon: "" },
  { slug: "janken", name: "じゃんけん", description: "CPU とじゃんけん。連勝記録を伸ばそう", icon: "" },
  { slug: "color", name: "色当てチャレンジ", description: "文字の「意味」ではなく「色」を答える反射テスト(ストループ課題)", icon: "" },
];
