/**
 * SingletonTouch returns an instance with indicator
 * of whether it's the first time it's been called.
 */
export class SingletonTouch {
  constructor() {}

  public _value: boolean = false;

  public get value(): boolean {
    const oldValue = this._value;
    this._value = true;
    return oldValue;
  }
}
