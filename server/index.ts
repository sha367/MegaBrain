import express from 'express';
import cors from 'cors';
import { startRouter } from './router';

export const startServer = async () => {
  const app = express();
  const PORT = process.env.SERVER_DEFAULT_PORT || 3000;

  app.use(cors());
  app.use(express.json());

  startRouter(app);

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};
