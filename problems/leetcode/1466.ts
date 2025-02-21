// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero

function solution(n: number, connections: [number, number][]): number {
  return 0;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    2,
    6,
    [
      [0, 1],
      [1, 3],
      [2, 3],
      [4, 0],
      [4, 5],
    ],
  ],
];

export const leet1466 = { solution, cases };
