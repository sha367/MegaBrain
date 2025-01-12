import { Stack, IconButton, Tooltip, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useState } from "react";

export const AppHeader = () => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 w-full h-14 text-white shadow-md"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      }}
    >
      {/* Logo and Title */}
      <Link 
        to="/" 
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <AutoAwesomeIcon 
          className="text-yellow-300" 
          sx={{ fontSize: 28 }}
        />
        <h1 className="text-2xl font-bold tracking-tight">
          MyGenAI
        </h1>
      </Link>

      {/* Right Side Navigation */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Settings" arrow placement="bottom">
          <Link 
            to="/settings"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 hover:bg-blue-400/30">
              <SettingsIcon 
                className={`transition-transform duration-300 ${isHovered ? "rotate-90" : ""}`}
                sx={{ fontSize: 20 }}
              />
              <span className="text-sm font-medium">Settings</span>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
          </Link>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
