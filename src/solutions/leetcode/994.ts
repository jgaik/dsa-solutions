// https://leetcode.com/problems/rotting-oranges

import { MapQueue } from "../../utils/queues/map-queue";

function solution(grid: number[][]): number {
  let freshOranges = 0;
  const queue = new MapQueue<[number, number]>();

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      switch (grid[x][y]) {
        case 0:
          break;
        case 1:
          freshOranges++;
          break;
        case 2:
          queue.enqueue([x, y]);
          break;
      }
    }
  }

  let minutes = 0;

  while (queue.length > 0 && freshOranges > 0) {
    minutes++;

    const rottenLen = queue.length;

    for (let idx = 0; idx < rottenLen; idx++) {
      const [x, y] = queue.dequeue()!;

      for (const [dx, dy] of directions) {
        const [nextX, nextY] = [x + dx, y + dy];

        if (
          nextX < grid.length &&
          nextX >= 0 &&
          nextY < grid[0].length &&
          nextY >= 0 &&
          grid[nextX][nextY] === 1
        ) {
          grid[nextX][nextY] = 2;
          freshOranges--;
          queue.enqueue([nextX, nextY]);
        }
      }
    }
  }

  return freshOranges > 0 ? -1 : minutes;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    4,
    [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ],
  ],
  [
    -1,
    [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ],
  ],
  [0, [[0, 2]]],
];

export const leet994 = { solution, cases };
