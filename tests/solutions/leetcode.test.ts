import { describe, expect, test } from "vitest";
import { leet141 } from "../../src/solutions/leetcode/141";
import { leet1466 } from "../../src/solutions/leetcode/1466";
import { leet17 } from "../../src/solutions/leetcode/17";
import { leet19 } from "../../src/solutions/leetcode/19";
import { leet1926 } from "../../src/solutions/leetcode/1926";
import { leet200 } from "../../src/solutions/leetcode/200";
import { leet202 } from "../../src/solutions/leetcode/202";
import { leet22 } from "../../src/solutions/leetcode/22";
import { leet24 } from "../../src/solutions/leetcode/24";
import { leet2462 } from "../../src/solutions/leetcode/2462";
import { leet2542 } from "../../src/solutions/leetcode/2542";
import { leet287 } from "../../src/solutions/leetcode/287";
import { leet36 } from "../../src/solutions/leetcode/36";
import { leet399 } from "../../src/solutions/leetcode/399";
import { leet450 } from "../../src/solutions/leetcode/450";
import { leet547 } from "../../src/solutions/leetcode/547";
import { leet994 } from "../../src/solutions/leetcode/994";

const leetcode = {
  17: leet17,
  19: leet19,
  22: leet22,
  24: leet24,
  36: leet36,
  141: leet141,
  200: leet200,
  202: leet202,
  287: leet287,
  399: leet399,
  450: leet450,
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
