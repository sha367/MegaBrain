import fs from 'node:fs';

import { LogProvider } from "./LogProvider";
import { exec, execFile } from 'node:child_process';
import { createRoleIfNotExistsQuery } from './lib/queries/createRoleIfNotExistsQuery';
import { createChatsQuery } from './lib/queries/createChats.query';
import { createMessagesQuery } from './lib/queries/createMessages.query';

export class PostgresProvider {
  /** Initialize the LLMProvider */
  public static init() {}

  /** Stop the Postgres server if it is running. */
  public static stopPostgresIfRunning(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Skip if the socket file does not exist
      if (!fs.existsSync(process.env.SOCKET_FILE)) {
        return resolve(undefined);
      }

      // Stop the server
      execFile(process.env.SOCKET_FILE,
        [
          'stop',
          '-D', process.env.DATABASE_DIR,
          '-m', 'fast'
        ], (error, _, stderr) => error
          ? PostgresProvider.freePortIfInUse('5432').then(() => resolve()).catch(() => reject(new Error(`Error stopping PostgreSQL server: ${stderr}`)))
          : resolve(undefined)
      );
    });
  }

  /** Initialize the Postgres database cluster. */
  public static initializeDatabaseCluster() {
    // Check if the cluster is already initialized
    if (fs.existsSync(process.env.PG_VERSION_PATH)) {
      LogProvider.log('PostgreSQL cluster is already initialized.');
      return Promise.resolve();
    }

    // Create database folder if it does not exist
    if (!fs.existsSync(process.env.DATABASE_DIR)) {
      fs.mkdirSync(process.env.DATABASE_DIR, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      // Initialize the database cluster
      execFile(process.env.INITDB_PATH, [
        '-D', process.env.DATABASE_DIR
      ], {
        env: {
          ...process.env,
          LANG: 'en_US.UTF-8',
          LC_ALL: 'en_US.UTF-8',
        }
      }, (error, stdout, stderr) => error
        ? reject(`Error initializing cluster: ${stderr}`)
        : resolve(stdout)
      );
    });
  }

  /** Check if the port is in use and kill it */
  public static freePortIfInUse(port: string) {
    return new Promise((resolve, reject) => {
      exec(`lsof -ti:${port} | xargs kill -9`, (error, _, stderr) => {
        if (error) {
          if (stderr.trim() === '') {
            return resolve(true);
          }
          return reject(new Error(`Error freeing port ${port}: ${stderr}`));
        }

        LogProvider.log(`Freed processes on port ${port}.`);
        resolve(undefined);
      });
    });
  }

  /** Start the Postgres server. */
  public static startPostgresServer() {
    LogProvider.log('Starting PostgreSQL server...');

    // Create the socket directory if it does not exist
    if (!fs.existsSync(process.env.SOCKET_DIR)) {
      fs.mkdirSync(process.env.SOCKET_DIR, { recursive: true });
    }

    execFile(process.env.POSTGRES_BIN, [
      '-D', process.env.DATABASE_DIR,
      '-k', process.env.SOCKET_DIR,
      '-p', '5432',
      '-c', `logging_collector=off`,
      '-c', `log_destination=stderr`,
    ], (error, _, stderr) => {
      if (error) {
        throw new Error(`Error starting PostgreSQL server: ${stderr}`);
      }
    });
  }

  /** Create the role if it does not exist. */
  public static waitForPostgresServer() {
    return new Promise((resolve, reject) => {
      // Set an interval to check the server status
      const interval = setInterval(() => {
        LogProvider.log('Checking postgres server status...');
        execFile(process.env.PG_CTL_PATH, [
          'status',
          '-D', process.env.DATABASE_DIR
        ], (error, stdout) => {
          if (!error && stdout.includes('server is running')) {
            clearInterval(interval);
            resolve(stdout);
          }
        });
      }, 500);

      // Set a timeout to reject the promise
      setTimeout(() => {
        clearInterval(interval);
        reject(new Error('PostgreSQL server did not start in time.'));
      }, 15000);
    });
  }

  /** Create a role if it does not exist. */
  public static createRoleIfNotExists(): Promise<string> {
    LogProvider.log('Creating role...');

    return new Promise((resolve, reject) => {
      execFile(process.env.PSQL_PATH, [
        '-h', process.env.SOCKET_DIR,
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
    LogProvider.log('Checking if database exists...');

    return new Promise((resolve, reject) => {
      execFile(process.env.PSQL_PATH, [
        '-h', process.env.SOCKET_DIR,
        '-p', '5432',
        '-d', 'postgres',
        '-c', `SELECT datname FROM pg_database WHERE datname = '${process.env.DATABASE_NAME}';`,
      ], (error, stdout, stderr) => error
        ? reject(new Error(`Error checking database existence: ${stderr}`))
        : resolve(stdout.includes(process.env.DATABASE_NAME))
      );
    });
  }

  /** Create a database if it does not exist. */
  public static createDatabase(): Promise<string> {
    LogProvider.log('Creating database...');

    return new Promise((resolve, reject) => {
      execFile(process.env.PSQL_PATH, [
        '-h', process.env.SOCKET_DIR,
        '-p', '5432',
        '-d', 'postgres',
        '-c', `CREATE DATABASE ${process.env.DATABASE_NAME} OWNER default_role;`,
      ], (error, stdout, stderr) => error
        ? reject(new Error(`Error creating database: ${stderr}`))
        : resolve(stdout)
      );
    });
  }

  /** Create tables */
  public static async createTables(): Promise<void> {
    LogProvider.log('Creating tables...');

    /**
     * FIXME: This is a temporary solution to drop tables before creating them.
     * !!!ONLY FOR SOME DEVELOPMENT PURPOSES. DO NOT USE IN PRODUCTION!!!
     */
    // const dropTablesQuery = `
    //   DROP TABLE IF EXISTS messages CASCADE;
    //   DROP TABLE IF EXISTS chats CASCADE;
    // `;

    const queries = [
      // { description: "Dropping tables", query: dropTablesQuery },
      { description: "Creating chats table", query: createChatsQuery },
      { description: "Creating messages table", query: createMessagesQuery },
    ];

    for (const { description, query } of queries) {
      LogProvider.log(description);

      await new Promise((resolve, reject) => {
        execFile(process.env.PSQL_PATH, [
          '-h', process.env.SOCKET_DIR,
          '-p', '5432',
          '-d', process.env.DATABASE_NAME,
          '-c', query,
        ], (error, stdout, stderr) => {
          if (error) {
            LogProvider.error(`${description} failed: ${stderr}`);
            return reject(new Error(`${description} failed: ${stderr}`));
          }
          resolve(stdout);
        });
      });
    }

    LogProvider.log("Tables created successfully.");
  }


  /** Launch the server */
  public static async launch() {
    await PostgresProvider.stopPostgresIfRunning();
    await PostgresProvider.initializeDatabaseCluster();

    PostgresProvider.startPostgresServer();
    await PostgresProvider.waitForPostgresServer();

    await PostgresProvider.createRoleIfNotExists();
    const isDbExists = await PostgresProvider.checkIfDatabaseExist();
    if (!isDbExists) {
      await PostgresProvider.createDatabase();
    }
    await PostgresProvider.createTables();

    LogProvider.log('PostgreSQL server is running on port 5432');
  }
}

PostgresProvider.init();
