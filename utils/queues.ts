import { createDoubleLinkedList, DoubleLinkedListNode } from "./linked-lists";

export class Queue<T = any> {
  private _head: DoubleLinkedListNode<T | null>;
  private _tail: DoubleLinkedListNode<T | null>;
  length = 0;

  constructor() {
    [this._head, this._tail] = createDoubleLinkedList<T | null>([null, null]);
  }

  enqueue(item: T) {
    const newNode = new DoubleLinkedListNode<T | null>(
      item,
      this._tail.previous,
      this._tail
    );

    if (!this._tail.previous)
      throw new Error("Incorrectly linked list while enqueue");

    this._tail.previous.next = newNode;
    this._tail.previous = newNode;
    this.length++;
  }

  dequeue(): T | null {
    if (this.length === 0) return null;

    const out = this._head.next;
    if (!out || !out.next)
      throw new Error("Incorrectly linked list while dequeue");

    this._head.next = out.next;
    out.next.previous = this._head;
    this.length--;

    return out.value;
  }
}
