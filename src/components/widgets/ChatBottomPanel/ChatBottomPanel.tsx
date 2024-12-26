import { Send } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";

interface IChatBottomPanelProps {
  disabled?: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatBottomPanel = (props: IChatBottomPanelProps) => {
  const { disabled, onSendMessage } = props;

  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    try {
      const trimmedMessage = message.trim();

      if (!trimmedMessage) {
        return;
      }

      onSendMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Stack className="flex flex-row items-center justify-center w-full max-w-[48rem]">
      <TextField
        className="w-full"
        disabled={disabled}
        placeholder="Ask something..."
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton onClick={sendMessage} disabled={disabled}>
                <Send />
              </IconButton>
            ),
          },
        }}
      />
    </Stack>
  );
}
