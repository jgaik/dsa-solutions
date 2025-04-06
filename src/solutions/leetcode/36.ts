// https://leetcode.com/problems/valid-sudoku/

function solution(board: string[][]): boolean {
  const columns = Array.from({ length: 9 }, () => new Set()),
    rows = Array.from({ length: 9 }, () => new Set()),
    sections = Array.from({ length: 9 }, () => new Set());

  const getSection = (x: number, y: number) => {
    if (x < 3) {
      if (y < 3) return 0;
      if (y < 6) return 1;
      return 2;
    }
    if (x < 6) {
      if (y < 3) return 3;
      if (y < 6) return 4;
      return 5;
    }
    if (y < 3) return 6;
    if (y < 6) return 7;
    return 8;
  };

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board.length; y++) {
      if (board[x][y] === ".") continue;

      const num = board[x][y];

      if (columns[y].has(num)) return false;
      if (rows[x].has(num)) return false;
      const section = getSection(x, y);
      if (sections[section].has(num)) return false;

      columns[y].add(num);
      rows[x].add(num);
      sections[section].add(num);
    }
  }

  return true;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    true,
    [
      ["5", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ],
  ],
  [
    false,
    [
      ["8", "3", ".", ".", "7", ".", ".", ".", "."],
      ["6", ".", ".", "1", "9", "5", ".", ".", "."],
      [".", "9", "8", ".", ".", ".", ".", "6", "."],
      ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
      ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
      ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
      [".", "6", ".", ".", ".", ".", "2", "8", "."],
      [".", ".", ".", "4", "1", "9", ".", ".", "5"],
      [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ],
  ],
];

export const leet36 = { solution, cases };
