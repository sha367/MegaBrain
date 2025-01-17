import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useTheme } from "@/context/ThemeContext";

interface ReadmeModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const ReadmeModal = ({ open, onClose, title, content }: ReadmeModalProps) => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: colors.background.paper,
          backgroundImage: "none",
        }
      }}
    >
      <DialogTitle sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        color: colors.text.primary,
      }}>
        <Typography variant="h6">
          {title} Documentation
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: colors.text.secondary }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ 
        color: colors.text.primary,
        "& a": { color: colors.primary },
        "& code": { 
          backgroundColor: colors.background.secondary,
          padding: "2px 4px",
          borderRadius: 1,
        },
        "& pre": {
          backgroundColor: colors.background.secondary,
          padding: 2,
          borderRadius: 1,
          overflow: "auto",
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          display: "block",
          margin: "1rem 0",
          borderRadius: 1,
        },
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          color: colors.text.primary,
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        },
        "& p": {
          marginBottom: "1rem",
        },
        "& ul, & ol": {
          marginBottom: "1rem",
          paddingLeft: "1.5rem",
        },
      }}>
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw]}
          components={{
            img: ({ node, ...props }) => (
              <img 
                {...props} 
                style={{ 
                  maxWidth: "100%",
                  height: "auto",
                }} 
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </DialogContent>
    </Dialog>
  );
}; 