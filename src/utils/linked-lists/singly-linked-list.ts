export class SinglyLinkedListNode<T = any> {
  value: T;
  next: SinglyLinkedListNode<T> | null;

  constructor(value: T, next?: SinglyLinkedListNode<T> | null) {
    this.value = value;
    this.next = next ?? null;
  }

  toString(): string {
    if (!this.next) return String(this.value);
    return `${String(this.value)} -> ${this.next.toString()}`;
  }

  toArray(): Array<T> {
    const out: Array<T> = [];

    let follow: SinglyLinkedListNode<T> | null = this;
    while (follow) {
      out.push(follow.value);
      follow = follow.next;
    }

    return out;
  }

  static createList<T>(items: T[]): SinglyLinkedListNode<T> {
    if (items.length === 0)
      throw new Error("Empty list cannot be a linked list");

    const root = new SinglyLinkedListNode<T>(items[0]);

    let follow = root;
    for (let idx = 1; idx < items.length; idx++) {
      const next = new SinglyLinkedListNode<T>(items[idx]);
      follow.next = next;
      follow = follow.next;
    }

    return root;
  }
}
