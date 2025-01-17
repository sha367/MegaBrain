import { Outlet } from "react-router-dom";
import { Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export const SettingsPage = () => {
  const { theme } = useTheme();
  const { colors } = theme;

  return (
    <Box sx={{
      flex: 1, 
      padding: "2rem",  
      minHeight: "100vh", 
      marginTop: 7,
      paddingBottom: "10px",
      backgroundColor: colors.background.primary,
      overflowY: "auto",
      maxHeight: "100vh",
    }}>
      <Typography variant="h4" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
        Settings
      </Typography>
      <Outlet />
    </Box>
  );
};
