import { WindowProvider } from "./WindowProvider";

export interface ILoading {
  value: boolean;
}

export class LoadingProvider {
  /** The loading value */
  private static _value: boolean = false;

  /** Initialize the LoadingProvider */
  public static init() {}

  /** Set the loading value */
  public static set value(value: boolean) {
    LoadingProvider._value = value;

    WindowProvider.win?.webContents.send('set-loading', LoadingProvider.loading);
  }

  /** Get the loading value */
  public static get loading(): ILoading {
    return {
      value: LoadingProvider._value,
      // status: 'success' | ...,
    };
  }
}

LoadingProvider.init();
