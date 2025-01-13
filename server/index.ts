import express from 'express';
import cors from 'cors';
import { startRouter } from './router';
import { initDB } from './database';

export const startServer = async () => {
  const app = express();
  const PORT = process.env.SERVER_DEFAULT_PORT || 3000;

  app.use(cors());
  app.use(express.json());

  startRouter(app);

  // Initialize the database (create if not exist)
  initDB();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};
