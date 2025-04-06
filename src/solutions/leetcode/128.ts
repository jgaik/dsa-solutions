// https://leetcode.com/problems/longest-consecutive-sequence/

function solution(nums: number[]): number {
  const set = new Set<number>();

  for (const num of nums) {
    set.add(num);
  }

  let out = 0;

  for (let num of set) {
    if (set.has(num - 1)) continue;

    let count = 0;
    while (set.has(num++)) {
      count++;
    }
    out = Math.max(out, count);
    if (out === set.size) return out;
  }

  return out;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [[4, [100, 4, 200, 1, 3, 2]]];

export const leet128 = { solution, cases };
