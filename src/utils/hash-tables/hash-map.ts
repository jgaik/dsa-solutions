export class HashMap<K = any, V = any> {
  private _map: Map<string, V>;

  constructor(
    private _hashFunction: (key: K) => string,
    private _unhashFunction: (hashedKey: string) => K,
    entries?: [K, V][]
  ) {
    this._map = new Map(
      entries?.map(([key, value]) => [this._hashFunction(key), value])
    );
  }

  set(key: K, value: V): this {
    this._map.set(this._hashFunction(key), value);
    return this;
  }

  get(key: K): V | undefined {
    return this._map.get(this._hashFunction(key));
  }

  has(key: K): boolean {
    return this._map.has(this._hashFunction(key));
  }

  delete(key: K): boolean {
    return this._map.delete(this._hashFunction(key));
  }

  clear(): void {
    this._map.clear();
  }

  keys(): IterableIterator<K> {
    return Array.from(this._map.keys(), this._unhashFunction).values();
  }

  values(): IterableIterator<V> {
    return this._map.values();
  }

  entries(): IterableIterator<[K, V]> {
    return Array.from(
      this._map.entries(),
      ([hashedKey, value]) => [this._unhashFunction(hashedKey), value] as [K, V]
    ).values();
  }

  forEach(callbackfn: (value: V, key: K, map: HashMap<K, V>) => void): void {
    this._map.forEach((value, hashedKey) => {
      callbackfn(value, this._unhashFunction(hashedKey), this);
    });
  }

  get size(): number {
    return this._map.size;
  }

  toString(): string {
    const entries = Array.from(this._map.entries())
      .map(([hashedKey, value]) => `${hashedKey} => ${value}`)
      .join(", ");
    return `HashMap(${this.size}) { ${entries} }`;
  }
}
