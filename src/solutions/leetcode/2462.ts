// https://leetcode.com/problems/total-cost-to-hire-k-workers/

import { Heap } from "../../utils/heap";

function solution(costs: number[], k: number, candidates: number): number {
  const heap = new Heap<[number, number]>({
    comparator: (a, b) => (a[0] === b[0] ? a[1] < b[1] : a[0] < b[0]),
  });
  let leftIdx,
    rightIdx = costs.length - 1;

  for (leftIdx = 0; leftIdx < candidates; leftIdx++) {
    heap.push([costs[leftIdx], leftIdx]);
    if (rightIdx > candidates - 1) {
      heap.push([costs[rightIdx], rightIdx--]);
    }
  }

  let out = 0;
  for (let i = 0; i < k; i++) {
    const [cost, idx] = heap.pop();

    if (leftIdx <= rightIdx) {
      if (idx < leftIdx) {
        heap.push([costs[leftIdx], leftIdx++]);
      } else {
        heap.push([costs[rightIdx], rightIdx--]);
      }
    }
    out += cost;
  }
  return out;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [11, [17, 12, 10, 2, 7, 2, 11, 20, 8], 3, 4],
  [4, [1, 2, 4, 1], 3, 3],
  [12, [17, 12], 1, 1],
];

export const leet2462 = { solution, cases };
