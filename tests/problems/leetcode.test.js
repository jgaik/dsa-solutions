import { leetcode } from "../../src";
import { describe, expect, test } from "vitest";

describe.each(Object.keys(leetcode))(
  "Problem #%s",
  (key) => {
    const { cases, solution } = leetcode[key];

    test.each(cases)("solution passes test case #%#", (result, ...inputs) => {
      expect(solution(...inputs)).toEqual(result);
    });
  }
);
