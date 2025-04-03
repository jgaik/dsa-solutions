import { simpleFaker } from "@faker-js/faker";
import { beforeEach, describe, expect, test } from "vitest";
import { BinaryTreeNode } from "../../src/utils/trees/binary-tree";
import { MapQueue } from "../../src/utils/queues/map-queue";

describe("Trees", () => {
  const numOfItems = 10;
  const items = simpleFaker.helpers.arrayElements(
    Array.from(new Array(numOfItems).keys()),
    { min: 1, max: simpleFaker.number.int({ min: 1, max: numOfItems - 1 }) }
  );

  describe("BinaryTree.createTree", () => {
    let root: BinaryTreeNode | null = null;

    beforeEach(() => {
      root = BinaryTreeNode.createTree(items);
    });

    test("returns a root node correctly pointing to the items", () => {
      let idx = 0;
      const queue = new MapQueue<BinaryTreeNode | null>();
      queue.enqueue(root!);

      while (queue.length > 0) {
        const node = queue.dequeue();

        if (!node) continue;

        expect(node.value).toBe(items[idx]);
        idx++;
        queue.enqueue(node.left, node.right);
      }
      expect(idx).toBe(items.length);
    });
  });
});
