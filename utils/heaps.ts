export class Heap<T = any> {
  private _heap: Array<T>;
  private _comparator: (a: T, b: T) => boolean;

  constructor({
    comparator = (a, b) => a < b,
    array,
  }: {
    /**
     * @returns `true` when `a` should be the parent of `b`, otherwise - `false`
     */
    comparator?: (a: T, b: T) => boolean;
    array?: T[];
  } = {}) {
    this._comparator = comparator;
    if (array) {
      this._heap = array.slice();

      for (let idx = Math.floor(this.length / 2) - 1; idx >= 0; idx--) {
        this.bubbleDown(idx);
      }
    } else {
      this._heap = [];
    }
  }

  push(item: T) {
    this._heap.push(item);
    this.bubbleUp();
  }

  pop(): T | null {
    const last = this._heap.pop();

    if (last === undefined) return null;

    if (this.length === 0) return last;

    const out = this._heap[0];
    this._heap[0] = last;
    this.bubbleDown();
    return out;
  }

  peak(): T | null {
    return this._heap[0] ?? null;
  }

  get length() {
    return this._heap.length;
  }

  toString(): string {
    return this._heap.toString();
  }

  private bubbleUp() {
    let idx = this._heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);

      if (this._comparator(this._heap[parentIdx], this._heap[idx])) break;

      [this._heap[parentIdx], this._heap[idx]] = [
        this._heap[idx],
        this._heap[parentIdx],
      ];
      idx = parentIdx;
    }
  }

  private bubbleDown(idx = 0) {
    while (true) {
      let leftIdx = 2 * idx + 1,
        rightIdx = 2 * idx + 2,
        parentIdx = idx;

      if (
        leftIdx < this.length &&
        this._comparator(this._heap[leftIdx], this._heap[parentIdx])
      ) {
        parentIdx = leftIdx;
      }
      if (
        rightIdx < this.length &&
        this._comparator(this._heap[rightIdx], this._heap[parentIdx])
      ) {
        parentIdx = rightIdx;
      }

      if (parentIdx === idx) break;

      [this._heap[parentIdx], this._heap[idx]] = [
        this._heap[idx],
        this._heap[parentIdx],
      ];
      idx = parentIdx;
    }
  }
}
