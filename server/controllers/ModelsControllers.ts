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
    quantization_level?: number;
    parameter_size?: string;
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
      {
        "name": "gemma2:27b",
        "details": {
          "description": "Gemma 2 27B is a high-capacity model from Google DeepMind, specialized for deep language comprehension and multi-task NLP.",
          "parameter_size": "27B",
          "format": "GGML",
          "family": "Gemma"
        }
      },
      {
        "name": "phi4",
        "details": {
          "description": "Phi 4 is a 14B parameter model from Microsoft, offering state-of-the-art performance in conversational AI.",
          "parameter_size": "14B",
          "format": "GGML",
          "family": "Phi"
        }
      },
      {
        "name": "gemma2:9b",
        "details": {
          "description": "Gemma 2 9B is a robust language model from Google DeepMind, designed for high-performance language understanding and generation.",
          "parameter_size": "9B",
          "format": "GGML",
          "family": "Gemma"
        }
      },
      {
        "name": "llama3.1:8b",
        "details": {
          "description": "LLaMA 3.1 8B is a large-scale generative language model from Meta, built for complex reasoning and language tasks.",
          "parameter_size": "8B",
          "format": "GGML",
          "family": "LLaMA"
        }
      },
      {
        "name": "mistral:7b",
        "details": {
          "description": "Mistral 7B is an advanced generative model from Mistral AI, known for its efficiency and strong language capabilities.",
          "parameter_size": "7B",
          "format": "GGML",
          "family": "Mistral"
        }
      },
      {
        "name": "mistral-small",
        "details": {
          "description": "Mistral Small is a lightweight variant of the Mistral family, optimized for fast inference and memory efficiency.",
          "parameter_size": "7B",
          "format": "GGML",
          "family": "Mistral"
        }
      },
      {
        "name": "phi3:3.8b",
        "details": {
          "description": "Phi 3 Mini is a 3.8B parameter model from Microsoft, designed for advanced reasoning and conversational AI tasks.",
          "parameter_size": "3.8B",
          "format": "GGML",
          "family": "Phi"
        }
      },
      {
        "name": "llama3.2:3b",
        "details": {
          "description": "LLaMA 3.2 3B is a state-of-the-art language model from Meta, optimized for natural language understanding and generation.",
          "parameter_size": "3B",
          "format": "GGML",
          "family": "LLaMA"
        }
      },
      {
        "name": "gemma:2b",
        "details": {
          "description": "Gemma 2B is a cutting-edge language model from Google DeepMind, specialized for comprehensive text generation and summarization.",
          "parameter_size": "2B",
          "format": "GGML",
          "family": "Gemma"
        }
      }
    ]
    
    ;

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
