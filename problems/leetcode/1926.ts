// https://leetcode.com/problems/nearest-exit-from-entrance-in-maze

import { HashSet, Queue } from "../../utils";

function solution(maze: string[][], entrance: [number, number]): number {
  const m = maze.length;
  const n = maze[0].length;

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  maze[entrance[0]][entrance[1]] = "+";

  const queue = new Queue<number[]>();
  queue.enqueue([...entrance, 0]);

  while (queue.length > 0) {
    const [x, y, steps] = queue.dequeue()!;

    for (const [dx, dy] of directions) {
      const [nextX, nextY] = [x + dx, y + dy];
      if (nextX < 0 || nextX === m || nextY < 0 || nextY === n) {
        if (x !== entrance[0] || y !== entrance[1]) return steps;
      } else if (maze[nextX][nextY] !== "+") {
        queue.enqueue([nextX, nextY, steps + 1]);
        maze[nextX][nextY] = "+";
      }
    }
  }

  return -1;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    1,
    [
      ["+", "+", ".", "+"],
      [".", ".", ".", "+"],
      ["+", "+", "+", "."],
    ],
    [1, 2],
  ],
  [
    2,
    [
      ["+", "+", "+"],
      [".", ".", "."],
      ["+", "+", "+"],
    ],
    [1, 0],
  ],
  [-1, [[".", "+"]], [0, 0]],
];

export const leet1926 = { solution, cases };
