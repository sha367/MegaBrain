import { Send, Add, Language, KeyboardVoice } from "@mui/icons-material";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface IChatBottomPanelProps {
  disabled?: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatBottomPanel = (props: IChatBottomPanelProps) => {
  const { disabled, onSendMessage } = props;
  const { theme } = useTheme();
  const { colors } = theme;
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    try {
      const trimmedMessage = message.trim();
      if (!trimmedMessage) return;
      onSendMessage(message);
      setMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <Stack 
      className="flex flex-col items-center justify-center w-full max-w-[48rem]"
      spacing={1}
      sx={{ p: 2 }}
    >
      <Stack 
        direction="row" 
        spacing={1}
        sx={{
          width: "100%",
          backgroundColor: colors.background.secondary,
          borderRadius: "8px",
          border: `1px solid ${colors.border.divider}`,
          p: 1,
        }}
      >
        <IconButton 
          size="small"
          sx={{ color: colors.text.secondary }}
        >
          <Add sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton 
          size="small"
          sx={{ color: colors.text.secondary }}
        >
          <Language sx={{ fontSize: 20 }} />
        </IconButton>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          disabled={disabled}
          placeholder="Message MegaBrain..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "none",
              "& fieldset": { border: "none" },
              backgroundColor: "transparent",
              color: colors.text.primary,
            },
            "& .MuiInputBase-input": {
              "&::placeholder": {
                color: colors.text.placeholder,
                opacity: 1,
              },
            },
          }}
        />
        <IconButton 
          size="small"
          sx={{ color: colors.text.secondary }}
        >
          <KeyboardVoice sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton 
          size="small"
          onClick={sendMessage} 
          disabled={disabled || !message.trim()}
          sx={{ 
            color: message.trim() 
              ? colors.accent.main 
              : colors.text.secondary,
            "&.Mui-disabled": {
              color: colors.text.secondary,
            }
          }}
        >
          <Send sx={{ fontSize: 20 }} />
        </IconButton>
      </Stack>
      <Typography 
        variant="caption" 
        sx={{ 
          color: colors.text.secondary,
          textAlign: "center" 
        }}
      >
        MegaBrain can make mistakes. Consider checking important information.
      </Typography>
    </Stack>
  );
};
