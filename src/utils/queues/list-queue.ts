import { DoublyLinkedListNode } from "../linked-lists/doubly-linked-list";

export class ListQueue<T = any> {
  private _head: DoublyLinkedListNode<T | null>;
  private _tail: DoublyLinkedListNode<T | null>;
  private _length = 0;

  constructor() {
    [this._head, this._tail] = DoublyLinkedListNode.createList<T | null>([
      null,
      null,
    ]);
  }

  enqueue(item: T) {
    const newNode = new DoublyLinkedListNode<T | null>(
      item,
      this._tail.previous,
      this._tail
    );

    if (!this._tail.previous)
      throw new Error("Incorrectly linked list while enqueue");

    this._tail.previous.next = newNode;
    this._tail.previous = newNode;
    this._length++;
  }

  dequeue(): T | null {
    if (this.length === 0) return null;

    const out = this._head.next;
    if (!out || !out.next)
      throw new Error("Incorrectly linked list while dequeue");

    this._head.next = out.next;
    out.next.previous = this._head;
    this._length--;

    return out.value;
  }

  get length() {
    return this._length;
  }
}
