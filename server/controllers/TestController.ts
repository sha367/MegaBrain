import { Request, Response } from "express";

export class TestController {
  public static async test(req: Request, res: Response) {
    console.log(req, res);
    res.status(200).json({ message: 'Test' });
  }
}
