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
}

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
}

export function createSingleLinkedList<T>(items: T[]): SingleLinkedListNode<T> {
  if (items.length === 0) throw new Error("Empty list cannot be a linked list");

  const root = new SingleLinkedListNode<T>(items[0]);

  let follow = root;
  for (let idx = 1; idx < items.length; idx++) {
    const next = new SingleLinkedListNode<T>(items[idx]);
    follow.next = next;
    follow = follow.next;
  }

  return root;
}

export function createDoubleLinkedList<T>(
  items: T[]
): [head: DoubleLinkedListNode<T>, tail: DoubleLinkedListNode<T>] {
  if (items.length === 0) throw new Error("Empty list cannot be a linked list");

  const head = new DoubleLinkedListNode<T>(items[0]);

  let follow = head;
  for (let idx = 1; idx < items.length; idx++) {
    const next = new DoubleLinkedListNode<T>(items[idx], follow);
    follow.next = next;
    follow = follow.next;
  }

  return [head, follow];
}
