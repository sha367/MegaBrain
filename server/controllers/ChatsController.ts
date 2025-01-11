// ChatsController.ts
import { Request, Response } from "express";
import { openDb } from "./../database";

export class ChatsController {
  public static async getChats(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const db = await openDb();

      const chats = await db.all(
        "SELECT * FROM chats LIMIT ? OFFSET ?",
        Number(limit),
        Number(offset)
      );

      const total = await db.get("SELECT COUNT(*) AS total FROM chats");

      res.status(200).json({ items: chats, total: total?.total || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving chats", error });
    }
  }

  public static async createChat(req: Request, res: Response): Promise<void> {
    try {
      const { name, model } = req.body;
      if (!name || !model) {
        res.status(400).json({ message: "Name and model are required" });
        return;
      }

      const db = await openDb();
      const result = await db.run(
        "INSERT INTO chats (name, model, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
        name,
        model
      );

      const chat = {
        id: result.lastID,
        name,
        model,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      res.status(201).json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating chat", error });
    }
  }

  public static async deleteChat(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ message: "Chat ID is required" });
        return;
      }

      const db = await openDb();
      const result = await db.run("DELETE FROM chats WHERE id = ?", Number(id));

      if ((result?.changes || 0) > 0) {
        res.status(200).json({ message: "Chat deleted successfully" });
      } else {
        res.status(404).json({ message: "Chat not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting chat", error });
    }
  }
}
