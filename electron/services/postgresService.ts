import { execSync } from 'child_process';
import { ConfigProvider as CP } from './../providers/configProvider';
import path from 'node:path';
import fs from 'node:fs';
import { LOG } from './../providers/logProvider';
import { Client } from 'pg';

export async function initDB() {
  try {
    const dataPath = CP.configs.DATA_PATH;
    const pgVersionPath = path.join(dataPath, 'PG_VERSION');

    if (!fs.existsSync(pgVersionPath)) {
      LOG.info('Database not initialized. Initializing now...');
      execSync(`${CP.configs.POSTGRES_PATH}/bin/initdb -D ${dataPath} --locale=en_US.UTF-8`);
      LOG.info('Database initialized.');
    } else {
      LOG.info('Database already initialized.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error initializing database: ${message}`);
    throw err; // Прекращаем выполнение, если не удается инициализировать базу
  }
}

export async function startDB() {
  try {
    const dataPath = CP.configs.DATA_PATH;
    const startCommand = `${CP.configs.POSTGRES_PATH}/bin/pg_ctl -D ${dataPath} -l logfile start`;
    execSync(startCommand);
    LOG.info('PostgreSQL started');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error starting PostgreSQL: ${message}`);
    throw err; // Прекращаем выполнение, если не удается запустить базу
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

// Функция для выполнения миграций (создание таблиц)
export async function applyMigrations() {
  try {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: '',
      password: '', // без пароля
      database: 'mydb', // имя базы данных
    });

    console.log('Подключение к базе данных...');

    client.connect()
      .catch((err) => {
        console.warn('Ошибка при подключении к базе данных:', err);
      })
      .then(() => {
        console.log('Подключение к базе данных успешно!');
        return client.query('SELECT * FROM models LIMIT 1');
      })
      .then((result) => {
        console.log('Данные из таблицы models:', result.rows);
        return client.query('SELECT * FROM chats LIMIT 1');
      })
      .then((result) => {
        console.log('Данные из таблицы chats:', result.rows);
        return client.query('SELECT * FROM messages LIMIT 1');
      })
      .then((result) => {
        console.log('Данные из таблицы messages:', result.rows);
      })
      .catch((err) => {
        console.error('Ошибка при запросе:', err);
      })
      .finally(() => {
        console.log('Завершение работы с базой данных');
        client.end();
      });

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

    migrations.forEach(async (migration) => {
      await client.query(migration);
    });

    LOG.info('Migrations applied');
    client.end();
    LOG.info('Client end');
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    LOG.error(`Error applying migrations: ${message}`);
    throw err;
  }
}
