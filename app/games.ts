export type Game = { slug: string; name: string; description: string; category: string };

export const categories = [
  { id: "puzzle", name: "パズル" },
  { id: "brain", name: "頭を使う" },
  { id: "speed", name: "反射・スピード" },
  { id: "play", name: "ひと息つく" },
];

export const games: Game[] = [
  { slug: "g2048", category: "puzzle", name: "2048", description: "同じ数字をぶつけて合わせ、2048を作る" },
  { slug: "slide", category: "puzzle", name: "スライドパズル", description: "1から15のタイルを動かして順番に並べる" },
  { slug: "lights", category: "puzzle", name: "ライトアウト", description: "5×5の明かりを全部消す。押すと上下左右も反転する" },
  { slug: "mines", category: "puzzle", name: "マインスイーパ", description: "地雷を避けて、9×9のマスを全部開く" },
  { slug: "memory", category: "brain", name: "神経衰弱", description: "絵柄のペアを少ない手数で揃える" },
  { slug: "math", category: "brain", name: "暗算チャレンジ", description: "60秒でいくつ解けるか。足し算、引き算、かけ算" },
  { slug: "guess", category: "brain", name: "数当て", description: "1から100の数字を、ヒントを頼りに当てる" },
  { slug: "tictactoe", category: "brain", name: "三目並べ", description: "CPUと対戦。かなり強いので、引き分けが目標" },
  { slug: "reaction", category: "speed", name: "反応速度テスト", description: "色が変わった瞬間にクリックして、ミリ秒で測る" },
  { slug: "whack", category: "speed", name: "もぐらたたき", description: "出てきたもぐらを30秒でできるだけたたく" },
  { slug: "color", category: "speed", name: "色当てチャレンジ", description: "文字の意味ではなく、文字の色を答える" },
  { slug: "typing", category: "speed", name: "タイピング", description: "英単語を60秒でいくつ打てるか" },
  { slug: "snake", category: "play", name: "スネーク", description: "エサを食べて伸びるヘビを操作する" },
  { slug: "janken", category: "play", name: "じゃんけん", description: "CPUと勝負して、連勝記録をのばす" },
];
