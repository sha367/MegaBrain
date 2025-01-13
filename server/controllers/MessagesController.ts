import { Request, Response } from "express";
import { openDb } from "./../database";

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

      const db = openDb();
      const messages = db
        .prepare(
          "SELECT * FROM messages WHERE chat_id = ? LIMIT ? OFFSET ?"
        )
        .all(Number(chat_id), Number(limit), Number(offset));

      const total = db
        .prepare("SELECT COUNT(*) AS total FROM messages WHERE chat_id = ?")
        .get(Number(chat_id)) as { total: number };

      res.status(200).json({ items: messages, total: total?.total || 0 });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving messages", error });
    }
  }

  public static createMessage(req: Request, res: Response): void {
    try {
      const { content, role, chat_id } = req.body;
      if (!content || !role || !chat_id) {
        res.status(400).json({ message: "Content, role, and chat ID are required" });
        return;
      }

      const db = openDb();
      const result = db
        .prepare(
          "INSERT INTO messages (content, role, chat_id, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
        )
        .run(content, role, chat_id);

      const message: IMessage = {
        id: result.lastInsertRowid as number,
        content,
        role,
        chat_id,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error creating message", error });
    }
  }

  /**
   * Creates a new user message in a chat.
   */
  public static async postMessage(req: Request, res: Response): Promise<void> {
    try {
      const { content, chat_id } = req.body;
      if (!content || !chat_id) {
        res.status(400).json({ message: "Content and chat ID are required" });
        return;
      }

      const role = "user";

      const db = openDb();
      const result = db
        .prepare(
          "INSERT INTO messages (content, role, chat_id, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
        )
        .run(content, role, chat_id);

      const message: IMessage = {
        id: result.lastInsertRowid as number,
        content,
        role,
        chat_id,
        created_at: new Date().toISOString(),
        updated_at: null,
      };

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ message: "Error creating message", error });
    }
  }

  /**
   * Handles chat interaction with LLM and stores assistant's response.
   */
  public static async llmChat(req: Request, res: Response): Promise<void> {
    try {
      const { chat_id } = req.body;

      if (!chat_id) {
        res.status(400).json({ message: "Chat ID is required" });
        return;
      }

      const db = openDb(); // `openDb()` теперь возвращает синхронный объект better-sqlite3.Database

      // Получение последних 20 сообщений
      const messages = db
        .prepare("SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 20")
        .all(Number(chat_id)) as IMessage[];

      // Получение информации о чате
      const chat = db
        .prepare("SELECT id, model FROM chats WHERE id = ?")
        .get(Number(chat_id)) as { id: number; model: string };

      if (!chat?.model) {
        res.status(400).json({ message: "Model name is not associated with the chat" });
        return;
      }

      const ollamaResponse = await fetch("http://127.0.0.1:11434/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: chat.model,
          messages: messages.reverse().map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!ollamaResponse.body) {
        throw new Error("No response body from Ollama");
      }

      const reader = ollamaResponse.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let totalLength = 0;
      let messageContent = "";

      res.setHeader("Content-Type", "application/json");
      res.flushHeaders();

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          totalLength += chunk.length;

          if (totalLength > 500000) {
            res.write(JSON.stringify({ message: "Response truncated after 500000 characters" }));
            break;
          }

          try {
            const parsed = JSON.parse(chunk);
            messageContent += parsed.message.content || "";
            res.write(JSON.stringify(parsed));
          } catch (error) {
            console.error("Error parsing chunk:", chunk);
          }
        }
      }

      if (messageContent) {
        db.prepare(
          "INSERT INTO messages (content, role, chat_id, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
        ).run(messageContent, "assistant", chat_id);
      }

      res.end();
    } catch (error) {
      res.status(500).json({ message: "Error processing LLM chat", error });
    }
  }
}
