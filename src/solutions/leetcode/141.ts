// https://leetcode.com/problems/linked-list-cycle

import { SinglyLinkedListNode } from "../../utils/linked-lists/singly-linked-list";

function solution(head: SinglyLinkedListNode): boolean {
  if (!head) return false;

  let slow = head,
    fast = head;

  while (slow.next && fast.next?.next) {
    slow = slow.next;

    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [true, SinglyLinkedListNode.createList([3, 2, 0, -4], 1)],
  [true, SinglyLinkedListNode.createList([1, 2], 0)],
  [false, SinglyLinkedListNode.createList([3, 2, 0, -4])],
];

export const leet141 = { solution, cases };
