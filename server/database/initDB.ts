import { openDb } from './openDB';

export const initDB = () => {
  const db = openDb();

  // Создаем таблицу Chats
  db.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(255) NOT NULL,
      model VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP
    );
  `);

  // Создаем таблицу Messages
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      role VARCHAR(255),
      chat_id INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE
    );
  `);

  console.log('Database initialized successfully!');
};
