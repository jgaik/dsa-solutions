// https://leetcode.com/problems/maximum-subsequence-score

import { Heap } from "../../utils/heap";

function solution(nums1: number[], nums2: number[], k: number): number {
  const heap = new Heap<number>();

  const indices = Array.from(new Array(nums1.length).keys()).sort(
    (a, b) => nums2[b] - nums2[a]
  );

  let out = 0,
    sum = 0;
  for (let idx = 0; idx < indices.length; idx++) {
    heap.push(nums1[indices[idx]]);
    sum += nums1[indices[idx]];

    if (heap.length > k) {
      sum -= heap.pop();
    }
    if (heap.length === k) {
      out = Math.max(out, sum * nums2[indices[idx]]);
    }
  }
  return out;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [12, [1, 3, 3, 2], [2, 1, 3, 4], 3],
  [30, [4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1],
  [168, [2, 1, 14, 12], [11, 7, 13, 6], 3],
];

export const leet2542 = { solution, cases };
