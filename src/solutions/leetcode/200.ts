// https://leetcode.com/problems/number-of-islands

function solution(grid: string[][]): number {
  let islands = 0;

  const directions: [number, number][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const dfs = (x: number, y: number) => {
    if (
      x < 0 ||
      y < 0 ||
      x >= grid.length ||
      y >= grid[0].length ||
      grid[x][y] === "0"
    )
      return;

    grid[x][y] = "0";
    directions.forEach(([dx, dy]) => {
      dfs(x + dx, y + dy);
    });
  };

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === "1") {
        islands++;
        dfs(x, y);
      }
    }
  }

  return islands;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    1,
    [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
  ],
  [
    3,
    [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
  ],
];

export const leet200 = { solution, cases };
