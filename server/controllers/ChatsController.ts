import { Request, Response } from "express";
import { PostgresClient } from "../lib/utils/PostgresClient.class";

export interface IChat {
  id: number;
  name: string;
  model: string;
  created_at: string;
  updated_at: string | null;
}

export class ChatsController {
  /**
   * Retrieves all chats with optional pagination.
   */
  public static async getChats(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 10, offset = 0 } = req.query;

      const { items, total } = await PostgresClient.readRecords<IChat>("chats", {
        limit: Number(limit),
        offset: Number(offset),
      });

      res.status(200).json({ items, total });
    } catch (e) {
      console.error(e);
      const error = e instanceof Error ? e.message : e;
      res.status(500).json({ message: "Error retrieving chats", error });
    }
  }

  /**
   * Creates a new chat.
   */
  public static async createChat(req: Request, res: Response): Promise<void> {
    try {
      const { name, model } = req.body;
      if (!name || !model) {
        res.status(400).json({ message: "Name and model are required" });
        return;
      }

      const chat = await PostgresClient.createRecord<IChat>("chats", { name, model });
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ message: "Error creating chat", error });
    }
  }

  /**
   * Deletes a chat by ID.
   */
  public static async deleteChat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.query;

      if (!id) {
        res.status(400).json({ message: "Chat ID is required" });
        return;
      }

      const success = await PostgresClient.deleteRecord("chats", Number(id));
      if (success) {
        res.status(200).json({ message: "Chat deleted successfully" });
      } else {
        res.status(404).json({ message: "Chat not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting chat", error });
    }
  }
}
