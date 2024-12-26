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

  public static async llmChat(req: Request, res: Response) {
    try {
      const { chat_id } = req.body;

      if (!chat_id) {
        res.status(400).json({ message: "Chat ID is required" });
        return;
      }

      // Получаем последние 20 сообщений из базы данных
      const { items } = await PostgresClient.readRecords<IMessage>("messages", {
        limit: 20,
        where: { chat_id: Number(chat_id) },
      });

      // Формируем массив сообщений для отправки в Ollama
      const messages = items.map((item) => ({
        role: item.role, // user, assistant, etc.
        content: item.content,
      }));

      // Отправляем запрос к серверу Ollama
      const ollamaResponse = await fetch('http://127.0.0.1:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'defaultModel:latest',
          messages: messages,
        }),
      });

      if (!ollamaResponse.body) {
        throw new Error('No response body from Ollama');
      }

      const reader = ollamaResponse.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let totalLength = 0;
      let messageContent = ''; // Сюда будем собирать только текстовое содержание

      // Передаем потоковый ответ от Ollama клиенту
      res.setHeader('Content-Type', 'application/json');
      res.flushHeaders(); // Начинаем отправку данных сразу

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          totalLength += chunk.length;

          // Если длина уже превышает 5000 символов, прекращаем отправку данных
          if (totalLength > 5000) {
            res.write(JSON.stringify({ message: 'Response truncated after 5000 characters' }));
            break;
          }

          // Парсим каждый чанк, извлекая только content
          try {
            const parsed = JSON.parse(chunk);
            messageContent += parsed.message.content || ''; // Собираем только контент
            res.write(JSON.stringify(parsed)); // Отправляем частичный ответ клиенту
          } catch (error) {
            console.error('Error parsing chunk:', chunk);
          }
        }
      }

      // После завершения стрима сохраняем только текстовое сообщение в базе данных
      if (messageContent) {
        await PostgresClient.createRecord<IMessage>("messages", {
          content: messageContent,
          role: 'assistant', // Указываем роль бота
          chat_id: Number(chat_id),
        });
      }

      res.end(); // Завершаем ответ, когда поток завершен

    } catch (error) {
      res.status(500).json({ message: 'Error retrieving messages', error });
    }
  }

}
