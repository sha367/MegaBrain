import { Request, Response } from "express";

export class MessagesController {
  public static async getMessages(req: Request, res: Response) {
    console.log(req, res);
  }

  public static async createMessage(req: Request, res: Response) {
    console.log(req, res);
  }
}
