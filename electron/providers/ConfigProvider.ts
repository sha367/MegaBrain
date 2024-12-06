import path from 'node:path';
import { fileURLToPath } from 'node:url'
import { SingletonIndicator } from '../lib/classes/SingletonIndicator';

/**
 * Configuration properties with JSdoc comments.
 */
export interface IConfigProps {
  isDev: boolean;

  /**
   * Path to the root directory.
   */
  appRoot: string;

  /**
   * The URL of the Vite development server.
   */
  viteDevServerUrl?: string;

  /**
   * Path to the main distribution directory.
   */
  mainDist: string;

  /**
   * Path to the renderer distribution directory.
   */
  rendererDist: string;

  /**
   * Path to the public directory.
   */
  vitePublic: string;

  /**
   * The name of the database.
   */
  databaseName: string;

  /**
   * Path to the resources directory.
   */
  resourcesPath: string;

  /**
   * Path to the Postgres directory.
   */
  postgresPath: string;

  /**
   * Path to the data directory.
   */
  dataDir: string;

  /**
   * Path to the initdb executable.
   */
  initdbPath: string;

  /**
   * Path to the PG_VERSION file.
   */
  pgVersionPath: string;

  /**
   * Path to the postgres executable.
   */
  postgresBin: string;

  /**
   * Path to the psql executable.
   */
  psqlPath: string;

  /**
   * Path to the socket directory.
   */
  socketDir: string;

  /**
   * Path to the socket file.
   */
  socketFile: string;

  /**
   * Path to the pg_ctl executable.
   */
  pgCtlPath: string;
}

/**
 * A provider for configuration values.
 */
export class ConfigProvider {
  private static __indicator__ = new SingletonIndicator();

  public static props: IConfigProps;

  /**
   * Initialize the ConfigProvider.
   */
  public static init() {
    if (this.__indicator__.value) {
      return;
    }

    ConfigProvider.props = {} as IConfigProps;

    ConfigProvider.props.isDev = process.env.NODE_ENV === 'development';

    ConfigProvider.props.appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

    // process.env.APP_ROOT = ConfigProvider.props.appRoot

    ConfigProvider.props.mainDist = path.join(ConfigProvider.props.appRoot, 'dist-electron');

    ConfigProvider.props.viteDevServerUrl = process.env['VITE_DEV_SERVER_URL'];

    ConfigProvider.props.rendererDist = path.join(ConfigProvider.props.appRoot, 'dist');
    
    ConfigProvider.props.vitePublic = ConfigProvider.props.viteDevServerUrl
      ? path.join(ConfigProvider.props.appRoot, 'public')
      : ConfigProvider.props.rendererDist;

    // process.env.VITE_PUBLIC = ConfigProvider.props.vitePublic;

    ConfigProvider.props.databaseName = 'mygpx_pgsdb';

    ConfigProvider.props.resourcesPath = ConfigProvider.props.isDev
      ? path.resolve(ConfigProvider.props.appRoot, 'resources')
      : path.join(process.resourcesPath);

    ConfigProvider.props.postgresPath = path.join(ConfigProvider.props.resourcesPath, 'postgres');

    ConfigProvider.props.dataDir = ConfigProvider.props.isDev
      ? path.join(ConfigProvider.props.appRoot, 'pgsdatabase')
      : path.join(process.resourcesPath, 'pgsdatabase');

    ConfigProvider.props.initdbPath = path.join(ConfigProvider.props.postgresPath, 'bin', 'initdb');

    ConfigProvider.props.pgVersionPath = path.join(ConfigProvider.props.dataDir, 'PG_VERSION');

    ConfigProvider.props.postgresBin = path.join(ConfigProvider.props.postgresPath, 'bin', 'postgres');

    ConfigProvider.props.psqlPath = path.join(ConfigProvider.props.postgresPath, 'bin', 'psql');

    ConfigProvider.props.socketDir = path.join(ConfigProvider.props.postgresPath, 'tmp');

    ConfigProvider.props.socketFile = path.join(ConfigProvider.props.socketDir, '.s.PGSQL.5432');
    
    ConfigProvider.props.pgCtlPath = path.join(ConfigProvider.props.postgresPath, 'bin', 'pg_ctl');

  }
}

// Auto-initialize the ConfigProvider.
ConfigProvider.init();


export const $props = { ...ConfigProvider.props };
