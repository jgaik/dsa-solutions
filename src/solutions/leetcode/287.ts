// https://leetcode.com/problems/find-the-duplicate-number

function solution(nums: number[]): number {
  let slow = 0,
    fast = 0;

  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];

    if (slow === fast) break;
  }

  let slow2 = 0;

  while (true) {
    slow = nums[slow];
    slow2 = nums[slow2];

    if (slow === slow2) return slow;
  }
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [3, [3, 1, 3, 4, 2]],
  [2, [1, 3, 4, 2, 2]],
  [3, [3, 3, 3, 3]],
];

export const leet287 = { solution, cases };
