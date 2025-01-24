import express from 'express';
import cors from 'cors';
import { startRouter } from './router/index.ts';
import { initDB } from './database/index.ts';
import axios from 'axios';

export const startServer = async () => {
  const app = express();
  const PORT = process.env.SERVER_DEFAULT_PORT || 3000;

  app.use(cors());
  app.use(express.json());

  // Add Ollama library proxy routes
  app.get("/api/ollama/library", async (req, res) => {
    try {
      const response = await axios.get("https://ollama.com/library");
      res.json(response.data);
    } catch (error) {
      console.error("Error fetching from Ollama library:", error);
      res.status(500).json({ error: "Failed to fetch from Ollama library" });
    }
  });

  app.get("/api/ollama/library/:modelName", async (req, res) => {
    try {
      const response = await axios.get(`https://ollama.com/library/${req.params.modelName}`);
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching model ${req.params.modelName}:`, error);
      res.status(500).json({ error: `Failed to fetch model ${req.params.modelName}` });
    }
  });

  app.get("/api/ollama/library/:modelName/tags", async (req, res) => {
    try {
      const response = await axios.get(`https://ollama.com/library/${req.params.modelName}/tags`);
      res.json(response.data);
    } catch (error) {
      console.error(`Error fetching tags for ${req.params.modelName}:`, error);
      res.status(500).json({ error: `Failed to fetch tags for ${req.params.modelName}` });
    }
  });

  startRouter(app);

  // Initialize the database (create if not exist)
  initDB();

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};
