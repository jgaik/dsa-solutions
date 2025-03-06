export class DoublyLinkedListNode<T = any> {
  value: T;
  previous: DoublyLinkedListNode<T> | null;
  next: DoublyLinkedListNode<T> | null;

  constructor(
    value: T,
    previous?: DoublyLinkedListNode<T> | null,
    next?: DoublyLinkedListNode<T> | null
  ) {
    this.value = value;
    this.previous = previous ?? null;
    this.next = next ?? null;
  }

  toString(): string {
    if (!this.next) return String(this.value);
    return `${String(this.value)} <-> ${this.next.toString()}`;
  }

  static createList<T>(
    items: T[]
  ): [head: DoublyLinkedListNode<T>, tail: DoublyLinkedListNode<T>] {
    if (items.length === 0)
      throw new Error("Empty list cannot be a linked list");

    const head = new DoublyLinkedListNode<T>(items[0]);

    let follow = head;
    for (let idx = 1; idx < items.length; idx++) {
      const next = new DoublyLinkedListNode<T>(items[idx], follow);
      follow.next = next;
      follow = follow.next;
    }

    return [head, follow];
  }
}
