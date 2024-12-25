import { useState } from "react";
import { Button } from "@mui/material";

export const NewChatPage = () => {
  const API_URL = "http://localhost:11434/api/chat";
  const MODEL = "defaultModel:latest";
  const MESSAGE = "why is the sky blue?";
  const [response, setResponse] = useState<string>("");

  const onSayHello = async () => {
    setResponse(""); // Очистить старый ответ перед новым запросом
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "user",
              content: MESSAGE,
            },
          ],
        }),
      });

      if (!res.body) {
        throw new Error("No response body from server");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          try {
            const parsed = JSON.parse(chunk);
            if (parsed.message?.content) {
              setResponse((prev) => prev + parsed.message.content);
            }
          } catch {
            console.error("Failed to parse chunk:", chunk);
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      }
      setResponse("Error: " + error);
    }
  };

  return (
    <div>
      <h1>New Chat Page</h1>
      <p>Create a new chat here!</p>
      <Button variant="contained" onClick={onSayHello}>
        Ask "Why is the sky blue?"
      </Button>
      {/* Отображение динамического ответа */}
      <p>{response || "Waiting for response..."}</p>
    </div>
  );
};
