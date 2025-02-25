export class SingleLinkedListNode<T = any> {
  value: T;
  next: SingleLinkedListNode<T> | null;

  constructor(value: T, next?: SingleLinkedListNode<T> | null) {
    this.value = value;
    this.next = next ?? null;
  }

  toString(): string {
    if (!this.next) return String(this.value);
    return `${String(this.value)} -> ${this.next.toString()}`;
  }

  static createSingleLinkedList<T>(items: T[]): SingleLinkedListNode<T> {
    if (items.length === 0)
      throw new Error("Empty list cannot be a linked list");

    const root = new SingleLinkedListNode<T>(items[0]);

    let follow = root;
    for (let idx = 1; idx < items.length; idx++) {
      const next = new SingleLinkedListNode<T>(items[idx]);
      follow.next = next;
      follow = follow.next;
    }

    return root;
  }
}
