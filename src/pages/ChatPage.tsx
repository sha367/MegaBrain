import { GET_MESSAGES, IMessage, POST_MESSAGE } from "@/api/v1";
import { MessageBlock } from "@/components";
import { ChatBottomPanel } from "@/components/widgets/ChatBottomPanel";
import { BASE_URL } from "@/lib/utils/apiClient";
import { Edit, Lens, StopRounded } from "@mui/icons-material";
import { Stack, Typography, IconButton } from "@mui/material";
import { useCallback, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { errorStore } from "@/store/errorStore";


export const ChatPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [botTypingMessage, setBotTypingMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);  // Ссылка на конец списка сообщений
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);  // Ссылка на контейнер сообщений
  const { theme } = useTheme();
  const { colors } = theme;
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await GET_MESSAGES({ chat_id: id!, limit: 1000 });
      const data = response?.data;

      if (!data?.items) {
        throw new Error('Error fetching messages');
      }

      // Sort messages by date (oldest first)
      const sortedMessages = [...data.items].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      
      setMessages(sortedMessages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
      setIsBotTyping(false);
      setBotTypingMessage("");
    }
  }, []);

  const llmChat = useCallback(async () => {
    try {
      setIsBotTyping(true);
      setIsGenerating(true);
      setBotTypingMessage("");

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      const response = await fetch(`${BASE_URL}/api/llmChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat_id: id! }),
        signal: abortControllerRef.current.signal,
      });

      // Check for error response first
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.type === "MODEL_ERROR") {
          errorStore.actions.showError(`Model Error: ${errorData.error}`);
        } else {
          errorStore.actions.showError(`Server Error: ${errorData.message}`);
        }
        return;
      }

      if (!response.body) {
        throw new Error('No response body from server');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let messageContent = "";
      
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          try {
            const parsed = JSON.parse(chunk);
            messageContent += parsed.message.content || "";
            setBotTypingMessage(messageContent);
          } catch (error) {
            console.error("Error parsing chunk:", chunk);
            continue;
          }
        }
      }

      if (messageContent) {
        const newMessage = {
          id: String(Date.now()),
          content: messageContent,
          role: "assistant",
          chat_id: id!,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        setMessages((prev) => [...prev, newMessage]);
      }

      setBotTypingMessage("");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Handle abort silently
        return;
      }
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      errorStore.actions.showError(`Chat Error: ${errorMessage}`);
      console.error("Error in llmChat:", error);
    } finally {
      setIsGenerating(false);
      setIsBotTyping(false);
      abortControllerRef.current = null;
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

      // Add new message maintaining chronological order
      setMessages((prev) => [...prev, data]);

      await llmChat();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, llmChat]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Function to check if user is near bottom
  const isNearBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return false;
    
    const threshold = 100; // pixels from bottom
    const position = container.scrollHeight - container.scrollTop - container.clientHeight;
    return position <= threshold;
  }, []);

  // Function to scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current && shouldAutoScroll) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [shouldAutoScroll]);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    setShouldAutoScroll(isNearBottom());
  }, [isNearBottom]);

  // Scroll on new messages or typing updates
  useEffect(() => {
    scrollToBottom();
  }, [messages, botTypingMessage, scrollToBottom]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <Stack className="flex-grow overflow-hidden p-2" sx={{
      backgroundColor: colors.background.primary,
      paddingTop: 7,
    }}>
      <Stack
        ref={messagesContainerRef}
        sx={{
          paddingY: 2,
          paddingX: 2,
        }}
        className="flex-grow overflow-auto gap-2 scroll-auto"
        onScroll={handleScroll}
      >
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageBlock key={message.id} message={message} />
          ))
        ) : (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              height: "100%",
              color: colors.text.secondary,
              textAlign: "center",
              p: 2,
            }}
          >
            <Typography variant="body1">
              Send a message to start a chat
            </Typography>
          </Stack>
        )}

        <Stack className="gap-2">
          {botTypingMessage && (
            <MessageBlock
              message={{
                id: "typing",
                content: botTypingMessage,
                role: "assistant",
              }}
            />
          )}

          <Stack flexDirection="row" className={`flex items-end ${isBotTyping ? "opacity-100" : "opacity-0"}`}>
            <Edit />
            <Lens style={{ fontSize: 10 }} className="animate-[ping_0.9s_ease_0.3s_infinite]" />
            <Lens style={{ fontSize: 10 }} className="animate-[ping_0.9s_ease_0.4s_infinite]" />
            <Lens style={{ fontSize: 10 }} className="animate-[ping_0.9s_ease_0.5s_infinite]" />
          </Stack>
        </Stack>

        <div ref={messagesEndRef} />
      </Stack>

      <Stack className="flex flex-row items-center justify-center gap-2">
        <ChatBottomPanel 
          disabled={loading} 
          onSendMessage={onSendMessage}
          onStopGeneration={stopGeneration}
          isGenerating={isGenerating}
        />
      </Stack>
    </Stack>
  );
};
               