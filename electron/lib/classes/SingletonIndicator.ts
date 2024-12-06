export class SingletonIndicator {
  constructor() {}

  private __value__: boolean = false;

  public get value(): boolean {
    const ref = this.__value__;
    this.__value__ = true;
    return ref;
  }
}
