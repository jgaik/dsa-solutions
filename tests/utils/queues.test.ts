import { simpleFaker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";
import { ListQueue } from "../../src/utils/queues/list-queue";
import { MapQueue } from "../../src/utils/queues/map-queue";

describe("Queues", () => {
  const numOfItems = 10;
  const items = simpleFaker.helpers.arrayElements(
    Array.from(new Array(numOfItems).keys()),
    simpleFaker.number.int(numOfItems - 1)
  );

  describe.each([ListQueue, MapQueue])("%o", (obj) => {
    let queue: ListQueue | MapQueue;

    beforeEach(() => {
      queue = new obj();
    });

    test("creates an empty list", () => {
      expect(queue).toHaveLength(0);
    });

    test("allows enqueuing items", () => {
      queue.enqueue(...items);

      expect(queue).toHaveLength(items.length);
    });

    test("allows dequeueing items", () => {
      queue.enqueue(...items);

      let idx = 0;
      while (queue.length > 0) {
        expect(queue.dequeue()).toBe(items[idx++]);
      }
    });
  });
});
