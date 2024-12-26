import { GET_MESSAGES, IMessage, POST_MESSAGE } from "@/api/v1";
import { MessageBlock } from "@/components";
import { ChatBottomPanel } from "@/components/widgets/ChatBottomPanel";
import { BASE_URL } from "@/lib/utils/apiClient";
import { Edit, Lens } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

export const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [botTypingMessage, setBotTypingMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);  // Ссылка на конец списка сообщений
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);  // Ссылка на контейнер сообщений

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GET_MESSAGES({ chat_id: id!, limit: 1000 });
      const data = response?.data;

      if (!data?.items) {
        throw new Error('Error fetching messages');
      }

      setMessages(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const llmChat = useCallback(async () => {
    try {
      setIsBotTyping(true);
      setBotTypingMessage('');

      const response = await fetch(`${BASE_URL}/api/llmChat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chat_id: id! }),
      });

      if (!response.body) {
        throw new Error('No response body from server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let messageContent = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          try {
            const parsed = JSON.parse(chunk);
            messageContent += parsed.message.content || '';
            setBotTypingMessage(messageContent);
          } catch (error) {
            console.error('Error parsing chunk:', chunk);
          }
        }
      }

      setMessages((prev) => [
        {
          id: String(Date.now()),
          content: messageContent,
          role: 'assistant',
          chat_id: id!,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        ...prev,
      ]);

      setBotTypingMessage('');

    } catch (error) {
      console.error('Error in llmChat:', error);
      setBotTypingMessage('Error occurred while chatting');
    } finally {
      setIsBotTyping(false);
    }
  }, [id]);

  const onSendMessage = useCallback(async (content: string) => {
    try {
      setLoading(true);
      const response = await POST_MESSAGE({ content, chat_id: Number(id) });
      const data = response?.data;

      if (!data) {
        throw new Error('Error sending message');
      }

      setMessages((prev) => [data, ...prev]);

      await llmChat();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Функция для прокрутки блока вниз
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesContainerRef.current;
      if (container) {
        const isScrolledToBottom =
          container.scrollHeight - container.scrollTop - container.clientHeight <= 100;

        if (isScrolledToBottom) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    scrollToBottom();  // Прокрутка вниз при изменении сообщений
  }, [messages]);

  return (
    <Stack className="flex-grow overflow-hidden p-2">
      <Stack
        ref={messagesContainerRef}
        className="flex-grow overflow-auto gap-2 scroll-auto"
        onScroll={scrollToBottom} // Обработчик события прокрутки
      >
        {[...messages].reverse().map((message) => (
          <MessageBlock key={message.id} message={message} />
        ))}

        <Stack className="gap-2">
          {botTypingMessage && (
            <MessageBlock
              message={{
                id: 'typing',
                content: botTypingMessage,
                role: 'assistant',
                chat_id: id!,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }}
            />
          )}

          <Stack flexDirection='row' className={`flex items-end ${isBotTyping ? 'opacity-100' : 'opacity-0'}`}>
            <Edit />
            <Lens style={{ fontSize: 10 }} className="animate-[ping_0.9s_ease_0.3s_infinite]" />
            <Lens style={{ fontSize: 10 }} className="animate-[ping_0.9s_ease_0.4s_infinite]" />
            <Lens style={{ fontSize: 10 }} className="animate-[ping_0.9s_ease_0.5s_infinite]" />
          </Stack>
        </Stack>

        {/* Этот элемент должен быть внизу, чтобы прокручивать его */}
        <div ref={messagesEndRef} />
      </Stack>

      <Stack className="flex flex-row items-center justify-center">
        <ChatBottomPanel disabled={loading} onSendMessage={onSendMessage} />
      </Stack>
    </Stack>
  );
};
