import { Stack, IconButton, Tooltip } from "@mui/material";
import { Message, ContentCopy, Check } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(filterThinkTags(message.content));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  /**
   * Removes everything between <think> tags or starting from <think> tag
   * @param content - The message content to filter
   * @returns The filtered content without think tags and their contents
   */
  const filterThinkTags = (content: string): string => {
    // First try to remove complete <think> tags and their contents
    const withoutCompleteTags = content.replace(/<think>[\s\S]*?<\/think>/g, "");
    
    // Then check for any remaining incomplete <think> tags
    const thinkIndex = withoutCompleteTags.indexOf("<think>");
    return thinkIndex >= 0 
      ? withoutCompleteTags.substring(0, thinkIndex).trim() 
      : withoutCompleteTags.trim();
  };

  // Define common text styles
  const commonTextStyle = {
    color: colors.text.primary,
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  };

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={1}
      sx={{
        position: "relative", // Added for copy button positioning
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
        "&:hover .copy-button": {
          opacity: 1,
        },
      }}
    >
      {message.role !== "user" && (
        <Message 
          sx={{ 
            color: colors.text.primary,
            fontSize: 20,
            mt: 0.5,
          }} 
        />
      )}
      <Stack spacing={1} width="100%">
        <ReactMarkdown
          components={{
            // Text elements
            p: ({ children }) => <span style={commonTextStyle}>{children}</span>,
            h1: ({ children }) => <h1 style={commonTextStyle}>{children}</h1>,
            h2: ({ children }) => <h2 style={commonTextStyle}>{children}</h2>,
            h3: ({ children }) => <h3 style={commonTextStyle}>{children}</h3>,
            h4: ({ children }) => <h4 style={commonTextStyle}>{children}</h4>,
            h5: ({ children }) => <h5 style={commonTextStyle}>{children}</h5>,
            h6: ({ children }) => <h6 style={commonTextStyle}>{children}</h6>,
            strong: ({ children }) => <strong style={commonTextStyle}>{children}</strong>,
            em: ({ children }) => <em style={commonTextStyle}>{children}</em>,
            blockquote: ({ children }) => (
              <blockquote style={{
                ...commonTextStyle,
                borderLeft: `3px solid ${colors.text.primary}`,
                paddingLeft: "10px",
                margin: "8px 0",
              }}>
                {children}
              </blockquote>
            ),
            a: ({ children, href }) => (
              <a 
                href={href}
                style={{
                  ...commonTextStyle,
                  color: colors.primary,
                  textDecoration: "underline",
                }}
              >
                {children}
              </a>
            ),
            li: ({ children, ordered }) => (
              <li 
                style={{
                  ...commonTextStyle,
                  display: "list-item",
                  listStyleType: ordered ? "decimal" : "disc",
                  marginLeft: "1em",
                }}
              >
                {children}
              </li>
            ),
            ul: ({ children }) => (
              <ul 
                style={{ 
                  ...commonTextStyle,
                  listStyleType: "disc",
                  paddingLeft: "20px",
                  margin: "8px 0",
                }}
              >
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol 
                style={{ 
                  ...commonTextStyle,
                  listStyleType: "decimal",
                  paddingLeft: "20px",
                  margin: "8px 0",
                }}
              >
                {children}
              </ol>
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
                color: colors.text.primary,
              }}>
                {children}
              </pre>
            ),
          }}
        >
          {filterThinkTags(message.content)}
        </ReactMarkdown>
        
        <Tooltip title={copied ? "Copied!" : "Copy message"}>
          <IconButton
            className="copy-button"
            onClick={handleCopy}
            size="small"
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              opacity: 0,
              transition: "opacity 0.2s",
              backgroundColor: colors.background.secondary,
              "&:hover": {
                backgroundColor: colors.background.paper,
              },
              "& .MuiSvgIcon-root": {
                fontSize: "16px",
                color: colors.text.secondary,
              },
            }}
          >
            {copied ? <Check /> : <ContentCopy />}
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
