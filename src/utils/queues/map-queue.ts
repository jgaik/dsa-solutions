export class MapQueue<T = any> {
  private _headIdx = 0;
  private _tailIdx = 0;
  private _map = new Map<number, T>();

  enqueue(...items: T[]) {
    items.forEach((item) => {
      this._map.set(this._tailIdx++, item);
    });
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
