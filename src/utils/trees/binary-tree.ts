import { MapQueue } from "../queues/map-queue";

export class BinaryTreeNode<T = any> {
  value: T;
  left: BinaryTreeNode<T> | null;

  right: BinaryTreeNode<T> | null;

  constructor(
    value: T,
    left: BinaryTreeNode<T> | null = null,
    right: BinaryTreeNode<T> | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  toString(): string {
    const queue = new MapQueue<BinaryTreeNode<T> | null>();
    const result: string[] = [];

    queue.enqueue(this);
    while (queue.length > 0) {
      const levelSize = queue.length;
      const level: string[] = [];

      let nonEmptyLevel = false;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.dequeue();
        if (node) {
          level.push(`(${String(node.value)})`);
          nonEmptyLevel = true;
          queue.enqueue(node.left, node.right);
        } else {
          level.push("()");
        }
      }

      if (nonEmptyLevel) {
        result.push(level.join(""));
      }
    }

    return result.join("\n");
  }

  static createTree<T>(items: Array<T | null>): BinaryTreeNode<T> {
    if (items.length === 0 || items[0] === null)
      throw new Error("Empty list cannot be a binary tree");

    const root = new BinaryTreeNode(items[0]);

    const queue = new MapQueue<BinaryTreeNode<T>>();
    queue.enqueue(root);

    let idx = 1;

    while (queue.length > 0 && idx < items.length) {
      const node = queue.dequeue()!;

      const [left, right = null] = [items[idx], items[idx + 1]];

      if (left !== null) {
        node.left = new BinaryTreeNode(left);
        queue.enqueue(node.left);
      }
      if (right !== null) {
        node.right = new BinaryTreeNode(right);
        queue.enqueue(node.right);
      }

      idx += 2;
    }

    return root;
  }
}
