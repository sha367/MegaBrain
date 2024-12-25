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
    const recommendedModels: IModel[] = [{
      name: 'llama3.2:1b',
      details: {
        format: 'gguf',
        family: 'llama'
      }
    }];

    res.status(200).json({ models: recommendedModels });
  }

  public static async pullModel(req: Request, res: Response) {
    console.log(req, res);
  }
}
