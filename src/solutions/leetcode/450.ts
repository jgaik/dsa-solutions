// https://leetcode.com/problems/delete-node-in-a-bst

import { BinaryTreeNode } from "../../utils/trees/binary-tree";

function solution(
  root: BinaryTreeNode<number> | null,
  key: number
): BinaryTreeNode<number> | null {
  if (!root) return null;

  if (root.value < key) {
    root.right = solution(root.right, key);
  } else if (root.value > key) {
    root.left = solution(root.left, key);
  } else {
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let min = root.right;
    while (min.left) {
      min = min.left;
    }
    root.value = min.value;
    root.right = solution(root.right, min.value);
  }

  return root;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    BinaryTreeNode.createTree([5, 4, 6, 2, null, null, 7]),
    BinaryTreeNode.createTree([5, 3, 6, 2, 4, null, 7]),
    3,
  ],
  [
    BinaryTreeNode.createTree([5, 3, 6, 2, 4, null, 7]),
    BinaryTreeNode.createTree([5, 3, 6, 2, 4, null, 7]),
    0,
  ],
];

export const leet450 = { solution, cases };
