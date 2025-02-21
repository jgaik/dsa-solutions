import { leetcode } from "./leetcode";
import { describe, expect, test } from "vitest";

describe.each(Object.keys(leetcode))(
  "Problem #%s",
  (key) => {
    const { cases, solution } = leetcode[key];

    test.each(cases)("passes case #%#", (result, ...inputs) => {
      expect(solution(...inputs)).toBe(result);
    });
  }
);
