import { expect, test } from "vitest";
import { solution } from "./547-number-of-provinces";

const cases: Array<
  [...Parameters<typeof solution>, ReturnType<typeof solution>]
> = [
  [
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ],
    2,
  ],
  [
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
    3,
  ],
];

test.each(cases)("passes case #%#", (input, result) => {
  expect(solution(input)).toBe(result);
});
