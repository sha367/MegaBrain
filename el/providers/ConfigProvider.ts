import path from "node:path"

export interface IConfigProviderProps {
  /** The root path of the application */
  APP_ROOT: string
  /** The Vite development server URL */
  VITE_DEV_SERVER_URL: string
  /** The main process distribution path */
  MAIN_DIST: string
  /** The renderer process distribution path */
  RENDERER_DIST: string
  /** The Vite public path */
  VITE_PUBLIC: string
}

export class ConfigProvider {
  private static _props: IConfigProviderProps = {
    APP_ROOT: '',
    VITE_DEV_SERVER_URL: '',
    MAIN_DIST: '',
    RENDERER_DIST: '',
    VITE_PUBLIC: '',
  };

  public static init() {
    ConfigProvider._props.APP_ROOT = path.join(path.dirname('./'), '../..');
    ConfigProvider._props.VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || '';
    ConfigProvider._props.MAIN_DIST = path.join(ConfigProvider._props.APP_ROOT, 'dist-electron');
    ConfigProvider._props.RENDERER_DIST = path.join(ConfigProvider._props.APP_ROOT, 'dist');
    ConfigProvider._props.VITE_PUBLIC = ConfigProvider._props.VITE_DEV_SERVER_URL
      ? path.join(ConfigProvider._props.APP_ROOT, 'public')
      : ConfigProvider._props.RENDERER_DIST;
  }

  public static get $props() {
    return { ...ConfigProvider._props};
  }
}

ConfigProvider.init();
