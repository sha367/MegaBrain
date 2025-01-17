import { Stack, IconButton, TextField } from "@mui/material";
import { Send, StopRounded } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import { useState, KeyboardEvent } from "react";

interface ChatBottomPanelProps {
  disabled?: boolean;
  onSendMessage: (message: string) => void;
  onStopGeneration?: () => void;
  isGenerating?: boolean;
}

export const ChatBottomPanel = ({ 
  disabled, 
  onSendMessage, 
  onStopGeneration,
  isGenerating = false
}: ChatBottomPanelProps) => {
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  const { colors } = theme;

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: "100%",
        maxWidth: "800px",
        p: 2,
        backgroundColor: colors.background.secondary,
        borderRadius: "12px",
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled || isGenerating}
        placeholder="Type a message..."
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: colors.background.paper,
            color: colors.text.primary,
            "& fieldset": {
              borderColor: colors.border.divider,
            },
            "&:hover fieldset": {
              borderColor: colors.border.hover,
            },
            "&.Mui-focused fieldset": {
              borderColor: colors.primary,
            },
          },
        }}
      />
      <IconButton
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        sx={{
          backgroundColor: colors.background.paper,
          color: isGenerating 
            ? colors.error.main 
            : message.trim() 
              ? colors.primary 
              : colors.text.disabled,
          "&:hover": {
            backgroundColor: colors.background.hover,
          },
          "&.Mui-disabled": {
            backgroundColor: colors.background.paper,
            color: colors.text.disabled,
          },
        }}
      >
        {isGenerating ? <StopRounded /> : <Send />}
      </IconButton>
    </Stack>
  );
};
