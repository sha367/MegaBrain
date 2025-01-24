import { Request, Response } from "express";
import { openDb } from "./../database";

export class ChatsController {
  public static getChats(req: Request, res: Response): void {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const db = openDb();

      const chats = db.prepare("SELECT * FROM chats LIMIT ? OFFSET ?").all(
        Number(limit),
        Number(offset)
      );

      const total = db.prepare("SELECT COUNT(*) AS total FROM chats").get() as { total: number };

      res.status(200).json({ items: chats, total: total?.total || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving chats", error });
    }
  }

  public static createChat(req: Request, res: Response): void {
    try {
      const { name, model } = req.body;
      if (!name || !model) {
        res.status(400).json({ message: "Name and model are required" });
        return;
      }
      // console.log("createChat log", name, model);
      const db = openDb();
      const result = db
        .prepare(
          "INSERT INTO chats (name, model, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)"
        )
        .run(name, model);

      const chat = {
        id: result.lastInsertRowid,
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

  public static deleteChat(req: Request, res: Response): void {
    try {
      const { id } = req.query;
      if (!id) {
        res.status(400).json({ message: "Chat ID is required" });
        return;
      }

      const db = openDb();
      const result = db.prepare("DELETE FROM chats WHERE id = ?").run(Number(id));

      if (result.changes > 0) {
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
