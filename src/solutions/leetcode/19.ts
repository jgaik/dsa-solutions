// https://leetcode.com/problems/remove-nth-node-from-end-of-list/

import { SinglyLinkedListNode } from "../../utils/linked-lists/singly-linked-list";

function solution(
  head: SinglyLinkedListNode,
  n: number
): SinglyLinkedListNode | null {
  const out = new SinglyLinkedListNode(-1, head);
  let prev: SinglyLinkedListNode = out;
  let follow: SinglyLinkedListNode = head;

  while (follow.next) {
    if (n > 1) n--;
    else prev = prev!.next!;
    follow = follow!.next!;
  }

  prev.next = prev.next!.next;

  return out.next;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    SinglyLinkedListNode.createList([1, 2, 3, 5]),
    SinglyLinkedListNode.createList([1, 2, 3, 4, 5]),
    2,
  ],
  [
    SinglyLinkedListNode.createList([2]),
    SinglyLinkedListNode.createList([1, 2]),
    2,
  ],
];

export const leet19 = { solution, cases };
