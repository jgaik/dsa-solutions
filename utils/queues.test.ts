import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";
import { Queue } from "./queues";

describe("Queues", () => {
  const numOfItems = 10;
  const items = faker.helpers.arrayElements(
    Array.from(new Array(numOfItems).keys()),
    faker.number.int(numOfItems - 1)
  );

  describe("Queue", () => {
    let queue: Queue;

    beforeEach(() => {
      queue = new Queue();
    });

    test("creates an empty list", () => {
      expect(queue).toHaveLength(0);
    });

    test("allows enqueuing items", () => {
      items.forEach((item) => {
        queue.enqueue(item);
      });

      expect(queue).toHaveLength(items.length);
    });

    test("allows dequeueing items", () => {
      items.forEach((item) => {
        queue.enqueue(item);
      });

      let idx = 0;
      while (queue.length > 0) {
        expect(queue.dequeue()).toBe(items[idx++]);
      }
    });
  });
});
