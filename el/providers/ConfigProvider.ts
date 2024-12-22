import path from "node:path"
import { fileURLToPath } from "node:url";

export interface IConfigProviderProps {
  /** Whether the application is in development mode */
  IS_DEV: boolean;
  /** The root path of the application */
  APP_ROOT: string;
  /** The Vite development server URL */
  VITE_DEV_SERVER_URL: string;
  /** The main process distribution path */
  MAIN_DIST: string;
  /** The renderer process distribution path */
  RENDERER_DIST: string;
  /** The Vite public path */
  VITE_PUBLIC: string;

  /** The path to the resources directory */
  RESOURCES_PATH: string;
  /** The path to the LLM executable */
  LLM_EXEC_PATH: string;
  /** The local address of the LLM server */
  LLM_LOCAL_ADDRESS: string;
}

export class ConfigProvider {
  private static _props: IConfigProviderProps = {
    IS_DEV: process.env.NODE_ENV === 'development',
    APP_ROOT: '',
    VITE_DEV_SERVER_URL: '',
    MAIN_DIST: '',
    RENDERER_DIST: '',
    VITE_PUBLIC: '',
    RESOURCES_PATH: '',
    LLM_EXEC_PATH: '',
    LLM_LOCAL_ADDRESS: 'http://127.0.0.1:11434',
  };

  public static init() {
    ConfigProvider._props.APP_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
    console.log('APP_ROOT:', ConfigProvider._props.APP_ROOT);
    ConfigProvider._props.VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL || '';
    ConfigProvider._props.MAIN_DIST = path.join(ConfigProvider._props.APP_ROOT, 'dist-electron');
    ConfigProvider._props.RENDERER_DIST = path.join(ConfigProvider._props.APP_ROOT, 'dist');
    ConfigProvider._props.VITE_PUBLIC = ConfigProvider._props.VITE_DEV_SERVER_URL
      ? path.join(ConfigProvider._props.APP_ROOT, 'public')
      : ConfigProvider._props.RENDERER_DIST;

    ConfigProvider._props.RESOURCES_PATH = ConfigProvider._props.IS_DEV
      ? path.resolve(ConfigProvider._props.APP_ROOT, 'resources')
      : path.join(process.resourcesPath);
    ConfigProvider._props.LLM_EXEC_PATH = path.join(ConfigProvider._props.RESOURCES_PATH, 'ollama', 'llm');
  }

  public static get $props() {
    return { ...ConfigProvider._props};
  }
}

ConfigProvider.init();
