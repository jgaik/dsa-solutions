// https://leetcode.com/problems/trapping-rain-water/

function solution(height: number[]): number {
  let max = 0;
  const leftMax = new Array(height.length);

  for (let idx = 0; idx < height.length; idx++) {
    max = Math.max(max, height[idx]);
    leftMax[idx] = max;
  }

  max = 0;
  let out = 0;
  for (let idx = height.length - 1; idx >= 0; idx--) {
    max = Math.max(max, height[idx]);
    out += Math.min(max, leftMax[idx]) - height[idx];
  }

  return out;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [6, [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
  [9, [4, 2, 0, 3, 2, 5]],
];

export const leet42 = { solution, cases };
