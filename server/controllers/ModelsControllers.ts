import { Request, Response } from "express";
import { llmClient } from "../lib/utils/llmClient";

export interface IModel {
  name: string;
  modified_at?: string;
  size?: number;
  digest?: string;
  details?: {
    format: string;
    family: string;
    description?: string;
  }
}

export class ModelsController {
  public static async getModels(_: Request, res: Response) {
    const response = await llmClient.get<IModel[]>('/api/tags');

    if (!response.data) {
      res.status(500).json({ message: 'No data' });
      return;
    }

    res.status(200).json(response.data);
  }

  public static async getRecommendedModels(_: Request, res: Response) {
    const recommendedModels: IModel[] = [
      { name: 'llama3.2:3b', details:{description: 'Llama 3.2 3b is a new state-of-the-art model from Meta', format: 'ggml', family: 'llama'}},
      { name: 'phi3:3.8b', details:{description: 'Phi 3 3.8b is a new state-of-the-art model from Meta', format: 'ggml', family: 'phi'}},
      { name: 'mistral:7b', details:{description: 'Mistral 7b is a new state-of-the-art model from Meta', format: 'ggml', family: 'mistral'}},
      { name: 'gemma:2b', details:{description: 'Gemma 2b is a new state-of-the-art model from Meta', format: 'ggml', family: 'gemma'}},
      { name: 'phi4', details:{description: 'Phi 4 is a new state-of-the-art model from Meta', format: 'ggml', family: 'phi'}},
      { name: 'mistral-small', details:{description: 'Mistral small is a new state-of-the-art model from Meta', format: 'ggml', family: 'mistral'}},
      { name: 'llama3.1:8b', details:{description: 'Llama 3.1 is a new state-of-the-art model from Meta', format: 'ggml', family: 'llama'}},
      { name: 'gemma2:9b', details:{description: 'Gemma 2 9b is a new state-of-the-art model from Meta', format: 'ggml', family: 'gemma'}},
      { name: 'gemma2:27b', details:{description: 'Gemma 2 27b is a new state-of-the-art model from Meta', format: 'ggml', family: 'gemma'}},
    ];

    res.status(200).json({ models: recommendedModels });
  }

  public static async pullModel(req: Request, res: Response) {
    try {
      const { model } = req.body;

      if (!model) {
        res.status(400).json({ message: "Model name is required" });
        return;
      }

      // Отправляем запрос к API
      const pullResponse = await fetch('http://localhost:11434/api/pull', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model }),
      });

      if (!pullResponse.body) {
        throw new Error('No response body from API');
      }

      const reader = pullResponse.body.getReader();
      const decoder = new TextDecoder();

      // Устанавливаем потоковый ответ клиенту
      res.setHeader('Content-Type', 'application/json');
      res.flushHeaders();

      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          res.write(chunk);
        }
      }

      res.end(); // Завершаем поток
    } catch (error) {
      console.error('Error pulling model:', error);
      res.status(500).json({ message: 'Error pulling model', error });
    }
  }

  public static async deleteModel(req: Request, res: Response): Promise<void> {
    try {
      const { model } = req.body;

      if (!model || typeof model !== "string") {
        res.status(400).json({ message: "Model name must be a valid string" });
        return;
      }

      const response = await fetch("http://localhost:11434/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model }),
      });

      if (response.status === 200) {
        res.status(200).json({ message: `Model '${model}' successfully deleted.` });
      } else if (response.status === 404) {
        res.status(404).json({ message: `Model '${model}' not found.` });
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to delete model: ${errorText}`);
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting model", error });
    }
  }
}
