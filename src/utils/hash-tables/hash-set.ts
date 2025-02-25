export class HashSet<T = any> {
  private _set;

  constructor(
    private _hashFunction: (key: T) => string,
    private _unhashFunction: (hashedKey: string) => T,
    array?: T[]
  ) {
    this._set = new Set(array?.map(this._hashFunction));
  }

  add(value: T): this {
    this._set.add(this._hashFunction(value));
    return this;
  }

  has(value: T): boolean {
    return this._set.has(this._hashFunction(value));
  }

  delete(value: T): boolean {
    return this._set.delete(this._hashFunction(value));
  }

  clear(): void {
    this._set.clear();
  }

  values(): IterableIterator<T> {
    return Array.from(this._set.values(), this._unhashFunction).values();
  }

  keys(): IterableIterator<T> {
    return Array.from(this._set.keys(), this._unhashFunction).values();
  }

  forEach(callbackfn: (value: T, set: HashSet<T>) => void): void {
    this._set.forEach((value) => {
      callbackfn(this._unhashFunction(value), this);
    });
  }

  get size(): number {
    return this._set.size;
  }

  toString(): string {
    const values = Array.from(this._set.values()).join(", ");
    return `HashSet(${this.size}) { ${values} }`;
  }
}
