// https://leetcode.com/problems/number-of-provinces

function solution(isConnected: number[][]): number {
  const n = isConnected.length;
  let provinces = 0;

  const dfs = (city: number) => {
    isConnected[city][city] = 0;

    for (let neighbor = 0; neighbor < n; neighbor++) {
      if (isConnected[city][neighbor] && isConnected[neighbor][neighbor]) {
        isConnected[city][neighbor] = 0;
        dfs(neighbor);
      }
    }
  };

  for (let city = 0; city < n; city++) {
    if (isConnected[city][city]) {
      provinces++;
      dfs(city);
    }
  }

  return provinces;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    2,
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ],
  ],
  [
    3,
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  ],
];

export const leet547 = { solution, cases };
