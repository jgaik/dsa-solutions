import { simpleFaker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";
import {
  createDoubleLinkedList,
  createSingleLinkedList,
  DoubleLinkedListNode,
  SingleLinkedListNode,
} from "./linked-lists";

describe("Linked Lists", () => {
  const numOfItems = 10;
  const items = simpleFaker.helpers.arrayElements(
    Array.from(new Array(numOfItems).keys()),
    simpleFaker.number.int(numOfItems - 1)
  );

  describe("createSingleLinkedList", () => {
    let root: SingleLinkedListNode | null = null;

    beforeEach(() => {
      root = createSingleLinkedList(items);
    });

    test("returns a root node correctly pointing to the items", () => {
      let idx = 0;
      while (root) {
        expect(root.value).toBe(items[idx]);
        idx++;
        root = root.next;
      }
      expect(idx).toBe(items.length);
    });

    test("returns a root node that correctly prints the list content", () => {
      expect(root!.toString()).toBe(items.join(" -> "));
    });
  });

  describe("createDoubleLinkedList", () => {
    let head: DoubleLinkedListNode | null = null,
      tail: DoubleLinkedListNode | null = null;

    beforeEach(() => {
      [head, tail] = createDoubleLinkedList(items);
    });

    test("returns a head node correctly pointing to the following items", () => {
      let idx = 0;
      while (head) {
        expect(head.value).toBe(items[idx++]);
        head = head.next;
      }
      expect(idx).toBe(items.length);
    });

    test("returns a tail node correctly pointing to the preceding items", () => {
      let idx = items.length;
      while (tail) {
        expect(tail.value).toBe(items[--idx]);
        tail = tail.previous;
      }
      expect(idx).toBe(0);
    });

    test("returns a head node that correctly prints the list content", () => {
      expect(head!.toString()).toBe(items.join(" <-> "));
    });
  });
});
