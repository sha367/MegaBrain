import path from "node:path";

export const getMockChats = async () => ([
  {
    id: "1",
    modelId: "1",
    lastMessage: "Chat 1 last message",
  },
  {
    id: "2",
    modelId: "2",
    lastMessage: "Chat 1 last message",
  },
]);

export const getMockMessages = async () => ([
  {
    id: "1",
    chatId: "1",
    message: "Message 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    chatId: "1",
    message: "Message 2",
    createdAt: new Date(),
  },
  {
    id: "3",
    chatId: "2",
    message: "Message 3",
    createdAt: new Date(),
  },
  {
    id: "4",
    chatId: "2",
    message: "Message 3",
    createdAt: new Date(),
  },
]);

export const getMockModels = async () => ([
  {
    id: "1",
    name: "Model 1",
    description: "Model 1 description",
    avatar: path.join(process.env.VITE_PUBLIC, "images", "ollama-avatar.svg"),
    url: "https://www.google.com",
    downloadUrl: "https://www.google.com",
  },
  {
    id: "2",
    name: "Model 2",
    description: "Model 2 description",
    avatar: path.join(process.env.VITE_PUBLIC, "images", "ollama-avatar.svg"),
    url: "https://www.google.com",
    downloadUrl: "https://www.google.com",
  },
  {
    id: "3",
    name: "Model 3",
    description: "Model 3 description",
    avatar: path.join(process.env.VITE_PUBLIC, "images", "ollama-avatar.svg"),
    url: "https://www.google.com",
    downloadUrl: "https://www.google.com",
  },
]);
