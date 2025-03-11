// https://leetcode.com/problems/generate-parentheses/

function solution(n: number): string[] {
  const out: string[] = [];

  const dfs = (current: string, value: number) => {
    if (value < 0 || value > n || current.length > 2 * n) return;

    if (value === 0 && current.length === 2 * n) {
      out.push(current);
      return;
    }

    dfs(current + "(", value + 1);
    dfs(current + ")", value - 1);
  };

  dfs("", 0);
  return out;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [["((()))", "(()())", "(())()", "()(())", "()()()"], 3],
  [["()"], 1],
];

export const leet22 = { solution, cases };
