import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";
import { Heap } from "./heaps";

describe("Heaps", () => {
  const orderedItems = Array.from(new Array(10).keys());
  const items = faker.helpers.arrayElements(orderedItems, orderedItems.length);

  describe("Heap", () => {
    const comparator = (a: number, b: number) => a > b;

    describe("without array", () => {
      test("creates an empty heap", () => {
        const heap = new Heap();

        expect(heap).toHaveLength(0);
      });

      test("allows pushing items onto the heap", () => {
        const heap = new Heap();

        items.forEach((item) => {
          heap.push(item);
        });

        expect(heap).toHaveLength(items.length);
      });

      test("allows popping items from the heap", () => {
        const heap = new Heap();

        items.forEach((item) => {
          heap.push(item);
        });

        let idx = 0;
        while (heap.length > 0) {
          expect(heap.pop()).toBe(orderedItems[idx++]);
        }
      });

      test("creates a custom heap using a comparator", () => {
        const heap = new Heap({ comparator });

        items.forEach((item) => {
          heap.push(item);
        });

        let idx = orderedItems.length;
        while (heap.length > 0) {
          expect(heap.pop()).toBe(orderedItems[--idx]);
        }
      });
    });

    describe("with array", () => {
      test("creates a non-empty heap", () => {
        const heap = new Heap({ array: items });

        expect(heap).toHaveLength(items.length);
      });

      test("creates a min heap by default", () => {
        const heap = new Heap({ array: items });

        expect(heap.peak()).toBe(0);
      });

      test("creates a custom heap using a comparator", () => {
        const heap = new Heap({ array: items, comparator: (a, b) => a > b });

        expect(heap.peak()).toBe(orderedItems[orderedItems.length - 1]);
      });
    });
  });
});
