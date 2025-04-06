// https://leetcode.com/problems/group-anagrams/

function solution(strs: string[]): string[][] {
  const getStrKey = (str: string) => str.split("").sort().join("");

  const map = new Map<string, string[]>();

  for (const str of strs) {
    const strKey = getStrKey(str);
    const arr = map.get(strKey);

    if (arr) {
      arr.push(str);
    } else {
      map.set(strKey, [str]);
    }
  }

  return [...map.values()];
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
    ["eat", "tea", "tan", "ate", "nat", "bat"],
  ],
];

export const leet49 = { solution, cases };
