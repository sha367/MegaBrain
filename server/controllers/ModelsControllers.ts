import { Request, Response } from "express";

export class ModelsController {
  public static async getModels(req: Request, res: Response) {
    console.log(req, res);
  }

  public static async getRecommmendedModels(req: Request, res: Response) {
    console.log(req, res);
  }

  public static async pullModel(req: Request, res: Response) {
    console.log(req, res);
  }
}
