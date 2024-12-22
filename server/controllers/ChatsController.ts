import { Request, Response } from "express";

export class ChatsController {
  public static async getChats(req: Request, res: Response) {
    console.log(req, res);
  }

  public static async createChat(req: Request, res: Response) {
    console.log(req, res);
  }

  // public static async readChat(req: Request, res: Response) {

  // }

  // public static async updateChat(req: Request, res: Response) {

  // }

  public static async deleteChat(req: Request, res: Response) {
    console.log(req, res);
  }
}
