import { GET_MESSAGES, IMessage, POST_MESSAGE } from "@/api/v1";
import { MessageBlock } from "@/components";
import { ChatBottomPanel } from "@/components/widgets/ChatBottomPanel";
import { Stack } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await GET_MESSAGES({ chat_id: id!, limit: 1000 });

      const data = response?.data;

      if (!data?.items) {
        throw new Error('Error fetching messages');
      }

      setMessages(data.items || []);
    } catch (error) {
      console.error(error);
    }
  }, [id])

  const onSendMessage = useCallback(async (content: string) => {
    try {
      const response = await POST_MESSAGE({ content, chat_id: Number(id) });
      const data = response?.data;

      if (!data) {
        throw new Error('Error sending message');
      }

      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <Stack className="flex-grow overflow-hidden p-2">
      <Stack className="flex-grow overflow-auto gap-2">
        {messages.map((message) => (
          <MessageBlock key={message.id} message={message} />
        ))}
      </Stack>

      <Stack className="flex flex-row items-center justify-center">
        <ChatBottomPanel onSendMessage={onSendMessage} />
      </Stack>
    </Stack>
  );
};
