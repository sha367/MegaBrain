import { execFile, exec } from 'child_process';
import fs from 'fs';
import { $props } from '../../providers/ConfigProvider';
import { LogService } from '../LogService';
import { createModelsQuery, createChatsQuery, createMessagesQuery, createRoleIfNotExistsQuery } from './queries';
import { WindowContentService } from '../WindowContentService';

/** Service for managing the Postgres database. */
export class PostgresService {
  /** Initialize the Postgres database cluster. */
  public static initializeDatabaseCluster() {
    LogService.log('Initializing PostgreSQL cluster...');

    if (fs.existsSync($props.pgVersionPath)) {
      LogService.log('PostgreSQL cluster is already initialized.');
      return Promise.resolve();
    }
  
    if (!fs.existsSync($props.dataDir)) {
      fs.mkdirSync($props.dataDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      execFile($props.initdbPath, [
        '-D', $props.dataDir
      ], {
        env: {
          ...process.env,
          LANG: 'en_US.UTF-8',
          LC_ALL: 'en_US.UTF-8',
        }
      }, (error, stdout, stderr) => error
        ? reject(`Error initializing cluster: ${error} ${stderr}`)
        : resolve(stdout)
      );
    });
  }

  /** Stop the Postgres server if it is running. */
  public static stopPostgresIfRunning(): Promise<void> {
    LogService.log('stop Postgres if running...');

    return new Promise((resolve, reject) => {
      if (!fs.existsSync($props.socketFile)) {
        return resolve(undefined);
      }
      
      LogService.log('PostgreSQL server is running, stopping it...');
      
      execFile($props.pgCtlPath, 
        [
          'stop',
          '-D', $props.dataDir,
          '-m', 'fast'
        ], (error, stdout, stderr) => error 
          ? reject(new Error(`Error stopping PostgreSQL server: ${stderr}`))
          : resolve(undefined)
      );
    });
  }

  public static freePortIfInUse(port: string) {
    return new Promise((resolve, reject) => {
      exec(`lsof -ti:${port} | xargs kill -9`, (error, stdout, stderr) => {
        if (error) {
          if (stderr.trim() === '') {
            return resolve(new Error(`No processes on port ${port}.`));
          }
          return reject(new Error(`Error freeing port ${port}: ${stderr}`));
        }
        LogService.log(`Freed processes on port ${port}.`);
        resolve(undefined);
      });
    });
  }

  /** Start the Postgres server. */
  public static startPostgresServer() {
    LogService.log('Starting PostgreSQL server...');

    if (!fs.existsSync($props.socketDir)) {
      fs.mkdirSync($props.socketDir, { recursive: true });
    }

    execFile($props.postgresBin, [
      '-D', $props.dataDir,
      '-k', $props.socketDir,
      '-p', '5432',
      '-c', `logging_collector=off`,
      '-c', `log_destination=stderr`,
    ], (error, stdout, stderr) => {
      if (error) {
        throw new Error(`Error starting PostgreSQL server: ${stderr}`)
      }
    });
  }

  /** Wait for the Postgres server to start. */
  public static waitForPostgresServer() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        LogService.log('Checking postgres server status...');
        execFile($props.pgCtlPath, ['status', '-D', $props.dataDir], (error, stdout) => {
          if (!error && stdout.includes('server is running')) {
            clearInterval(interval);
            resolve(stdout);
          }
        });
      }, 500);
  
      setTimeout(() => {
        clearInterval(interval);
        reject(new Error('PostgreSQL server did not start in time.'));
      }, 15000);
    });
  }

  /** Create a role if it does not exist. */
  public static createRoleIfNotExists(): Promise<string> {
    LogService.log('Creating role...');

    return new Promise((resolve, reject) => {
      execFile($props.psqlPath, [
        '-h', $props.socketDir,
        '-p', '5432',
        '-d', 'postgres',
        '-c', createRoleIfNotExistsQuery,
      ], (error, stdout, stderr) => error
        ? reject(new Error(`Error creating role: ${stderr}`))
        : resolve(stdout)
      );
    });
  }

  /** Create a database if it does not exist. */
  public static checkIfDatabaseExist(): Promise<boolean> {
    LogService.log('Checking if database exists...');

    return new Promise((resolve, reject) => {
      execFile($props.psqlPath, [
        '-h', $props.socketDir,
        '-p', '5432',
        '-d', 'postgres',
        '-c', `SELECT datname FROM pg_database WHERE datname = '${$props.databaseName}';`,
      ], (error, stdout, stderr) => error
        ? reject(new Error(`Error checking database existence: ${stderr}`))
        : resolve(stdout.includes($props.databaseName))
      );
    });
  }

  /** Create a database if it does not exist. */
  public static createDatabase(): Promise<string> {
    LogService.log('Creating database...');

    return new Promise((resolve, reject) => {
      execFile($props.psqlPath, [
        '-h', $props.socketDir,
        '-p', '5432',
        '-d', 'postgres',
        '-c', `CREATE DATABASE ${$props.databaseName} OWNER default_role;`,
      ], (error, stdout, stderr) => error
        ? reject(new Error(`Error creating database: ${stderr}`))
        : resolve(stdout)
      );
    });
  }

  /** Create tables. */
  public static createTables(): Promise<string> {
    LogService.log('Creating tables...');

    const createTablesQuery = `
      DROP TABLE IF EXISTS models CASCADE;
      DROP TABLE IF EXISTS chats CASCADE;
      DROP TABLE IF EXISTS messages CASCADE;

      ${createModelsQuery}
      ${createChatsQuery}
      ${createMessagesQuery}

      INSERT INTO models (name, url)
      VALUES ('Test Model', 'https://www.google.com/');
    `;

    return new Promise((resolve, reject) => {
      execFile($props.psqlPath, [
        '-h', $props.socketDir,
        '-p', '5432',
        '-d', $props.databaseName,
        '-c', createTablesQuery,
      ], (error, stdout, stderr) => error
        ? reject(new Error(`Error creating tables: ${stderr}`))
        : resolve(stdout)
      );
    });
  }

  /** Quick setup the Postgres database. */
  public static async launch() {
    try {
      await PostgresService.stopPostgresIfRunning();
      await PostgresService.initializeDatabaseCluster();

      await PostgresService.freePortIfInUse('5432');

      PostgresService.startPostgresServer();
      await PostgresService.waitForPostgresServer();

      await PostgresService.createRoleIfNotExists();
      const isDbExists = await PostgresService.checkIfDatabaseExist();
      if (!isDbExists) {
        await PostgresService.createDatabase();
      }
      await PostgresService.createTables();

      WindowContentService.sendToAllWindows('set-loading-status', false);

      LogService.log('PostgreSQL server is running on port 5432');
    } catch (error) {
      LogService.error('Error during setup:', error);
    }
  }
}
