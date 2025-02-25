export class DoubleLinkedListNode<T = any> {
  value: T;
  previous: DoubleLinkedListNode<T> | null;
  next: DoubleLinkedListNode<T> | null;

  constructor(
    value: T,
    previous?: DoubleLinkedListNode<T> | null,
    next?: DoubleLinkedListNode<T> | null
  ) {
    this.value = value;
    this.previous = previous ?? null;
    this.next = next ?? null;
  }

  toString(): string {
    if (!this.next) return String(this.value);
    return `${String(this.value)} <-> ${this.next.toString()}`;
  }

  static createDoubleLinkedList<T>(
    items: T[]
  ): [head: DoubleLinkedListNode<T>, tail: DoubleLinkedListNode<T>] {
    if (items.length === 0)
      throw new Error("Empty list cannot be a linked list");

    const head = new DoubleLinkedListNode<T>(items[0]);

    let follow = head;
    for (let idx = 1; idx < items.length; idx++) {
      const next = new DoubleLinkedListNode<T>(items[idx], follow);
      follow.next = next;
      follow = follow.next;
    }

    return [head, follow];
  }
}
