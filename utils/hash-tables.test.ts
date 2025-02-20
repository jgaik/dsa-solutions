import { simpleFaker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { HashSet } from "./hash-tables";

describe("Hash Tables", () => {
  describe("HashSet", () => {
    type ItemType = [string, number];
    const item: ItemType = [
      simpleFaker.string.alpha(),
      simpleFaker.number.int(1),
    ];

    test("allows storing non-primitive items", () => {
      const set = new HashSet<ItemType>(
        (key) => key.join("_"),
        (hashed) => {
          const [str, num] = hashed.split("_");
          return [str, parseInt(num, 10)];
        },
        [item]
      );

      set.add([...item]);

      expect(set.size).toBe(1);
      expect(set.has(item)).toBe(true);

      for (const setItem of set.values()) {
        expect(setItem).toStrictEqual(item);
      }

      set.forEach((setItem) => {
        expect(setItem).toStrictEqual(item);
      });

      set.delete([...item]);

      expect(set.size).toBe(0);
    });
  });
});
