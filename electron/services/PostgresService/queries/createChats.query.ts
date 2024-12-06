export const createChatsQuery = `
  CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    model_id INTEGER REFERENCES models(id) ON DELETE SET NULL
  );
`;
