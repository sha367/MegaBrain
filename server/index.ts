import express, { Request, Response } from 'express';
import cors from 'cors';

export const startServer = async () => {
  const app = express();
  const PORT = process.env.SERVER_DEFAULT_PORT || 3000;

  app.use(cors());

  app.use(express.json());

  app.get('/', (_: Request, res: Response) => {
    res.send('Hello, Express with TypeScript!');
  });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};
