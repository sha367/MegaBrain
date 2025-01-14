import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

interface SidebarProps {
  onSelectCategory: (category: string) => void;
}

export const Sidebar = ({ onSelectCategory }: SidebarProps) => {
  const categories = [
    "AI Providers", "LLM", "Vector Database", "Embedder", 
    "Text Splitter & Chunking", "Voice & Speech", "Transcription", 
    "Admin", "Agent Skills", "Customization", "Tools", "Experimental Features"
  ];

  return (
    <Box sx={{ width: "250px", backgroundColor: "#f0f0f0", height: "100vh", padding: "1rem" }}>
      <Typography variant="h6" sx={{ marginBottom: "1rem", color: "#333" }}>
        INSTANCE SETTINGS
      </Typography>
      <List>
        {categories.map((text) => (
          <ListItem 
            component="div"
            onClick={() => onSelectCategory(text)}
            key={text}
          >
            <ListItemText primary={text} sx={{ color: "#555" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}; 