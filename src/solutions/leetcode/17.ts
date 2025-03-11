// https://leetcode.com/problems/letter-combinations-of-a-phone-number/

function solution(digits: string): string[] {
  if (digits.length === 0) return [];

  const letterMap: Record<string, string[]> = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const out: string[] = [];

  const dfs = (digitIdx: number, current: string) => {
    if (current.length === digits.length) {
      out.push(current);
      return;
    }
    for (const letter of letterMap[digits[digitIdx]]) {
      dfs(digitIdx + 1, current + letter);
    }
  };

  dfs(0, "");

  return out;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], "23"],
  [["a", "b", "c"], "2"],
];

export const leet17 = { solution, cases };
