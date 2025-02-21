import { createDoubleLinkedList, DoubleLinkedListNode } from "./linked-lists";

export class ListQueue<T = any> {
  private _head: DoubleLinkedListNode<T | null>;
  private _tail: DoubleLinkedListNode<T | null>;
  private _length = 0;

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

export class MapQueue<T = any> {
  private _headIdx = 0;
  private _tailIdx = 0;
  private _map = new Map<number, T>();

  enqueue(item: T) {
    this._map.set(this._tailIdx++, item);
  }

  dequeue(): T | null {
    if (this.length === 0) return null;

    const out = this._map.get(this._headIdx);
    if (out === undefined) throw new Error("Incorrectly indexed map");

    this._map.delete(this._headIdx++);
    return out;
  }

  get length() {
    return this._map.size;
  }
}
