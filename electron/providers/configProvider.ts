import path from 'node:path';

const getConfigs = (dirname: string) => {
  const RUN_LLM = process.env.RUN_LLM === '1';
  const USER_HOME = process.env.HOME || process.env.USERPROFILE;
  const OLLAMA_MODELS = `${USER_HOME}/ollama_models`;
  const APP_ROOT = path.join(dirname, '..');
  const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
  const MAIN_DIST = path.join(APP_ROOT, 'dist-electron');
  const RENDERER_DIST = path.join(APP_ROOT, 'dist');

  const RESOURCES_PATH = VITE_DEV_SERVER_URL
    ? path.join(dirname, '../resources')
    : process.resourcesPath;

  const LLM_PATH = path.join(RESOURCES_PATH, 'ollama/llm');
  const MODEL_FILE_PATH = path.join(OLLAMA_MODELS, 'Modelfile');

  const VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(APP_ROOT, 'public')
  : RENDERER_DIST;
  process.env.VITE_PUBLIC = VITE_PUBLIC;

  process.env.OLLAMA_MODELS = OLLAMA_MODELS;

  return {
    RUN_LLM,
    USER_HOME,
    OLLAMA_MODELS,
    APP_ROOT,
    VITE_DEV_SERVER_URL,
    MAIN_DIST,
    RENDERER_DIST,
    RESOURCES_PATH,
    LLM_PATH,
    VITE_PUBLIC,
    MODEL_FILE_PATH
  }
};

export class ConfigProvider {
  static _configs: ReturnType<typeof getConfigs>;

  static get configs() {
    return ConfigProvider._configs;
  }

  /** ! init before usage configs ! */
  static initConfigs(dirname: string) {
    ConfigProvider._configs = getConfigs(dirname);
  }
}
