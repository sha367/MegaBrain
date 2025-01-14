import { Stack } from "@mui/material";
import { Message } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@/context/ThemeContext";

interface IMessage {
  content: string;
  role: string;
  id?: string;
}

interface IMessageBlockProps {
  message: IMessage;
}

export const MessageBlock = ({ message }: IMessageBlockProps) => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={1}
      sx={{
        backgroundColor: message.role === "user" 
          ? colors.background.userBubble 
          : colors.background.botBubble,
        padding: "10px",
        borderRadius: "12px",
        maxWidth: "75%",
        alignSelf: message.role === "user" ? "flex-end" : "flex-start",
        boxShadow: `0 1px 2px ${colors.background.secondary}`,
        margin: "5px 0",
        width: "fit-content",
      }}
    >
      {message.role !== "user" && (
        <Message 
          sx={{ 
            color: colors.text.secondary,
            fontSize: 20,
            mt: 0.5,
          }} 
        />
      )}
      <div style={{ display: "inline" }}>
        <ReactMarkdown
          components={{
            p: ({ children }) => (
              <span style={{
                color: colors.text.primary,
                fontSize: "14px",
                display: "inline",
                lineHeight: "1.5",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}>
                {children}
              </span>
            ),
            code: ({ children }) => (
              <code style={{
                backgroundColor: colors.background.secondary,
                padding: "2px 4px",
                borderRadius: "4px",
                fontSize: "13px",
                color: colors.text.primary,
                fontFamily: "monospace",
              }}>
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre style={{
                backgroundColor: colors.background.secondary,
                padding: "12px",
                borderRadius: "8px",
                overflow: "auto",
                margin: "8px 0",
                width: "100%",
              }}>
                {children}
              </pre>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </Stack>
  );
};
