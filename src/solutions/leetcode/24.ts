// https://leetcode.com/problems/swap-nodes-in-pairs/

import { SinglyLinkedListNode } from "../../utils/linked-lists/singly-linked-list";

function solution(head: SinglyLinkedListNode): SinglyLinkedListNode {
  if (!head || !head.next) return head;

  const result = new SinglyLinkedListNode(0);
  let prev: SinglyLinkedListNode<number> | null = result,
    curr: SinglyLinkedListNode<number> | null = head;

  while (curr && curr.next) {
    const next: SinglyLinkedListNode<number> | null = curr.next;
    curr.next = next.next;
    next.next = curr;
    prev.next = next;
    prev = curr;
    curr = curr.next;
  }

  return result.next!;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    SinglyLinkedListNode.createList([2, 1, 4, 3]),
    SinglyLinkedListNode.createList([1, 2, 3, 4]),
  ],
  [
    SinglyLinkedListNode.createList([2, 1, 3]),
    SinglyLinkedListNode.createList([1, 2, 3]),
  ],
];

export const leet24 = { solution, cases };
