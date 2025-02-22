import { simpleFaker } from "@faker-js/faker";
import { describe, expect, test } from "vitest";
import { HashMap, HashSet } from "../../src";

describe("Hash Tables", () => {
  type KeyType = [string, number];
  const key: KeyType = [simpleFaker.string.alpha(), simpleFaker.number.int(1)];

  describe("HashSet", () => {
    test("allows storing non-primitive items", () => {
      const set = new HashSet<KeyType>(
        (key) => key.join("_"),
        (hashed) => {
          const [str, num] = hashed.split("_");
          return [str, parseInt(num, 10)];
        },
        [key]
      );

      set.add([...key]);

      expect(set.toString()).toBe(`HashSet(1) { ${key.join("_")} }`);
      expect(set.size).toBe(1);
      expect(set.has(key)).toBe(true);

      for (const setKey of set.keys()) {
        expect(setKey).toStrictEqual(key);
      }

      for (const setValues of set.values()) {
        expect(setValues).toStrictEqual(key);
      }

      set.forEach((setKey) => {
        expect(setKey).toStrictEqual(key);
      });

      set.delete([...key]);

      expect(set.size).toBe(0);
    });
  });

  describe("HashMap", () => {
    const value = simpleFaker.string.alphanumeric();

    test("allows storing and retrieving key-value pairs", () => {
      const map = new HashMap<KeyType, string>(
        (key) => key.join("_"),
        (hashed) => {
          const [str, num] = hashed.split("_");
          return [str, parseInt(num, 10)];
        },
        [[key, value]]
      );

      map.set(key, value);

      expect(map.toString()).toBe(
        `HashMap(1) { ${key.join("_")} => ${value} }`
      );
      expect(map.size).toBe(1);
      expect(map.has(key)).toBe(true);
      expect(map.get(key)).toBe(value);

      for (const [mapKey, mapValue] of map.entries()) {
        expect(mapKey).toStrictEqual(key);
        expect(mapValue).toBe(value);
      }

      map.forEach((mapValue, mapKey) => {
        expect(mapKey).toStrictEqual(key);
        expect(mapValue).toBe(value);
      });

      map.delete(key);

      expect(map.size).toBe(0);
    });
  });
});
