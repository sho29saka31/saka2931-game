export type Board = number[][];
const N = 4;

export const empty = (): Board => Array.from({ length: N }, () => Array(N).fill(0));

export function addRandom(b: Board): Board {
  const cells: [number, number][] = [];
  b.forEach((row, r) => row.forEach((v, c) => { if (v === 0) cells.push([r, c]); }));
  if (cells.length === 0) return b;
  const [r, c] = cells[Math.floor(Math.random() * cells.length)];
  const next = b.map((row) => [...row]);
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

export function newGame(): Board {
  return addRandom(addRandom(empty()));
}

function slideRow(row: number[]): { row: number[]; gained: number } {
  const tiles = row.filter((v) => v !== 0);
  const out: number[] = [];
  let gained = 0;
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i] === tiles[i + 1]) { out.push(tiles[i] * 2); gained += tiles[i] * 2; i++; }
    else out.push(tiles[i]);
  }
  while (out.length < N) out.push(0);
  return { row: out, gained };
}

const rotate = (b: Board): Board => b[0].map((_, c) => b.map((row) => row[c]).reverse());

export type Dir = "left" | "up" | "right" | "down";

export function move(b: Board, dir: Dir): { board: Board; gained: number; moved: boolean } {
  const turns = { left: 0, up: 3, right: 2, down: 1 }[dir];
  let cur = b;
  for (let i = 0; i < turns; i++) cur = rotate(cur);
  let gained = 0;
  cur = cur.map((row) => { const r = slideRow(row); gained += r.gained; return r.row; });
  for (let i = 0; i < (4 - turns) % 4; i++) cur = rotate(cur);
  const moved = cur.some((row, r) => row.some((v, c) => v !== b[r][c]));
  return { board: cur, gained, moved };
}

export function isOver(b: Board): boolean {
  return (["left", "up", "right", "down"] as Dir[]).every((d) => !move(b, d).moved);
}
