import { Request, Response } from "express";
import { PostgresClient } from "../lib/utils/PostgresClient.class";

export interface IMessage {
  id: number;
  content: string;
  role: string;
  chat_id: number;
  created_at: string;
  updated_at: string | null;
}

export class MessagesController {
  /**
   * Retrieves all messages for a specific chat.
   */
  public static async getMessages(req: Request, res: Response): Promise<void> {
    try {
      const { chat_id, limit = 10, offset = 0 } = req.query;

      if (!chat_id) {
        res.status(400).json({ message: "Chat ID is required" });
        return;
      }

      const { items, total } = await PostgresClient.readRecords<IMessage>("messages", {
        limit: Number(limit),
        offset: Number(offset),
        where: { chat_id: Number(chat_id) },
      });
      res.status(200).json({ items, total });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving messages", error });
    }
  }

  /**
   * Creates a new message in a chat.
   */
  public static async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const { content, role, chat_id } = req.body;
      if (!content || !role || !chat_id) {
        res.status(400).json({ message: "Content, role, and chat ID are required" });
        return;
      }

      const message = await PostgresClient.createRecord<IMessage>("messages", { content, role, chat_id });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error creating message", error });
    }
  }

  /**
   * Creates a new message in a chat.
   */
  public static async postMessage(req: Request, res: Response): Promise<void> {
    try {
      const { content, chat_id } = req.body;
      if (!content || !chat_id) {
        res.status(400).json({ message: "Content and chat ID are required" });
        return;
      }

      const role = "user";

      const message = await PostgresClient.createRecord<IMessage>("messages", { content, role, chat_id });
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error creating message", error });
    }
  }
}
