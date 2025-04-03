// https://leetcode.com/problems/happy-number

function solution(n: number): boolean {
  const digitSquareMap: Record<string, number> = {
    0: 0,
    1: 1,
    2: 4,
    3: 9,
    4: 16,
    5: 25,
    6: 36,
    7: 49,
    8: 64,
    9: 81,
  };

  const sumSquaredDigits = (num: number): number => {
    return num
      .toString()
      .split("")
      .reduce((sum, curr) => sum + digitSquareMap[curr], 0);
  };

  let slow = sumSquaredDigits(n),
    fast = sumSquaredDigits(slow);

  while (fast !== 1) {
    if (slow === fast) return false;

    slow = sumSquaredDigits(slow);
    fast = sumSquaredDigits(sumSquaredDigits(fast));
  }

  return true;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [true, 19],
  [true, 13],
  [false, 2],
];

export const leet202 = { solution, cases };
