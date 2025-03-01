import { describe, expect, test } from "vitest";
import { leet399 } from "../../src/solutions/leetcode/399";
import { leet547 } from "../../src/solutions/leetcode/547";
import { leet994 } from "../../src/solutions/leetcode/994";
import { leet1466 } from "../../src/solutions/leetcode/1466";
import { leet1926 } from "../../src/solutions/leetcode/1926";
import { leet2542 } from "../../src/solutions/leetcode/2542";
import { leet2462 } from "../../src/solutions/leetcode/2462";

const leetcode = {
  399: leet399,
  547: leet547,
  994: leet994,
  1466: leet1466,
  1926: leet1926,
  2462: leet2462,
  2542: leet2542,
};

describe.each(Object.keys(leetcode))("Problem #%s", (key) => {
  // @ts-expect-error
  const { cases, solution } = leetcode[key];

  // @ts-expect-error
  test.each(cases)("solution passes test case #%#", (result, ...inputs) => {
    expect(solution(...inputs)).toEqual(result);
  });
});
