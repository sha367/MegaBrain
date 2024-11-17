import { execSync } from 'child_process';
import { ConfigProvider as CP } from './../providers/configProvider';
import path from 'node:path';
import fs from 'node:fs';
import { LOG } from './../providers/logProvider';
import { Client } from 'pg';

export async function initDB() {
  try {
    const pgVersionPath = path.join(CP.configs.DATA_PATH, 'PG_VERSION');

    if (!fs.existsSync(pgVersionPath)) {
      LOG.info('Database not initialized. Initializing now...');
      execSync(`${CP.configs.POSTGRES_PATH}/bin/initdb -D ${CP.configs.DATA_PATH} --locale=en_US.UTF-8`);
      LOG.info('Database initialized.');
    } else {
      LOG.info('Database already initialized.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error initializing database: ${message}`);
    throw err;
  }
}

export async function startDB() {
  try {
    const startCommand = `${CP.configs.POSTGRES_PATH}/bin/pg_ctl -D ${CP.configs.DATA_PATH} -l logfile start`;
    execSync(startCommand);
    LOG.info('PostgreSQL started');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error starting PostgreSQL: ${message}`);
    throw err;
  }
}

export async function stopDB() {
  try {
    const dataPath = CP.configs.DATA_PATH;
    const stopCommand = `${CP.configs.POSTGRES_PATH}/bin/pg_ctl -D ${dataPath} stop`;
    execSync(stopCommand);
    LOG.info('PostgreSQL stopped');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error stopping PostgreSQL: ${message}`);
  }
}

export async function createRoleIfNeeded() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '', // Без пароля
    database: 'postgres', // Используем базу данных по умолчанию
  });

  try {
    LOG.info('Connecting to PostgreSQL server to check for role "postgres"...');
    await client.connect();
    LOG.info('Successfully connected to PostgreSQL server');

    // Проверяем, существует ли роль postgres
    const res = await client.query('SELECT 1 FROM pg_roles WHERE rolname = $1', ['postgres']);

    if (res.rowCount === 0) {
      LOG.info('Creating role "postgres"...');
      await client.query('CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD \'\';');
      LOG.info('Role "postgres" created.');
    } else {
      LOG.info('Role "postgres" already exists.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error in createRoleIfNeeded: ${message}`);
    throw err;
  } finally {
    try {
      await client.end();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      LOG.error(`Error closing connection: ${message}`);
    }
  }
}

export async function createDatabaseIfNeeded() {
  // await createRoleIfNeeded(); // Убедимся, что роль существует

  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '', // Без пароля
    database: 'postgres', // Используем базу данных по умолчанию
  });

  try {
    LOG.info('Connecting to PostgreSQL server to check for database "mydb"...');
    await client.connect();
    LOG.info('Successfully connected to PostgreSQL server');

    // Проверяем, существует ли база данных mydb
    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', ['mydb']);

    if (res.rowCount === 0) {
      LOG.info('Creating database "mydb"...');
      await client.query('CREATE DATABASE mydb');
      LOG.info('Database "mydb" created.');
    } else {
      LOG.info('Database "mydb" already exists.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error in createDatabaseIfNeeded: ${message}`);
    throw err;
  } finally {
    try {
      await client.end();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      LOG.error(`Error closing connection: ${message}`);
    }
  }
}

export async function applyMigrations() {
  try {
    // Создаем базу данных, если нужно
    await createDatabaseIfNeeded();

    // Теперь подключаемся к базе данных mydb
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: '',
      password: '', // без пароля
      database: 'mydb', // имя базы данных
    });

    LOG.info('Applying migrations to "mydb"...');
    await client.connect();
    LOG.info('Connected to "mydb" for migrations');

    const migrations = [
      `CREATE TABLE IF NOT EXISTS models (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        avatar TEXT,
        url TEXT,
        download_url TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS chats (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        model_id INTEGER REFERENCES models(id)
      );`,
      `CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        chat_id INTEGER REFERENCES chats(id),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    ];

    for (const migration of migrations) {
      await client.query(migration);  // Выполняем каждую миграцию
    }

    LOG.info('Migrations applied successfully');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error applying migrations: ${message}`);
    throw err;
  }
}
