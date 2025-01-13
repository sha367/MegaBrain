import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/CreateOutlined";  
import MenuIcon from "@mui/icons-material/FlipOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { IChat } from "@/api/v1";
import { useChatsStore } from "@/store";
import { ChatsListItem } from "./ui";
import { lightTheme } from "@/theme/colors";

/**
 * Chats list component
 */
export const ChatsList = () => {
  const { colors } = lightTheme;
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const match = location.pathname.match(/\/chat\/(\d+)/);
  const currentChatId = match ? match[1] : null;

  const { chats, refetchChats, deleteChat } = useChatsStore();

  useEffect(() => {
    refetchChats();
  }, [refetchChats]);

 
  const onChatClick = (chat: IChat) => {
    navigate(`/chat/${chat.id}`);
  };

  const onDeleteHandler = (chat: IChat) => {
    deleteChat(chat);
  };

  return (
    <>  {/* Title Bar */}
    <Stack 
      id="title-bar"
      direction="row"
      alignItems="flex-start"
      sx={{ 
        height: "48px",
        width: "100%",
        position: "absolute",
        top: 4,
        px: 2,
        borderBottom: `1px solid ${colors.border.divider}`,
      }}
    >
     

      {/* Toggle Button - Right side */}
      <Stack 
        direction="row" 
        spacing={0.6}
        sx={{ 
          p: 0.6,
          ml: 7,
          justifyContent: "flex-end",
        }}
      > 
        <Tooltip title="Toggle sidebar" placement="bottom">
          <IconButton
            onClick={() => setIsSidebarOpen(s => !s)}
            sx={{
              color: colors.text.secondary,
              padding: "2px",
              "&:hover": {
                backgroundColor: colors.background.secondary
              }
            }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        

        <Tooltip title="New chat" placement="bottom">
          <IconButton
            onClick={() => navigate("/")}
            sx={{
              color: colors.text.secondary,
              "&:hover": {
                backgroundColor: colors.background.secondary
              }
            }}
          >
            <EditNoteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
        
      </Stack><Typography
          variant="h6"
          sx={{
            color: colors.text.primary,
            fontSize: "1rem",
            fontWeight: 700,
            flexGrow: 1,
            marginLeft: isSidebarOpen ? 20 : 2,
            textAlign: "flex-start",
            pt: 1,
            transition: "margin-left 0.2s ease-in-out",
          }}
        >
          Mega Chat
        </Typography>
      <Stack 
        direction="row" 
        spacing={0.6}
        sx={{ 
          p: 0.6,
          ml: 7,
          justifyContent: "flex-end",
          WebkitAppRegion: "no-drag",
        }}
      >
        <Tooltip title="Settings" placement="bottom">
          <IconButton
            onClick={() => navigate("/settings")}
            sx={{
              color: colors.text.secondary,
              "&:hover": {
                backgroundColor: colors.background.secondary
              }
            }}
          >
            <SettingsIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip></Stack>
      
    </Stack>
    <Stack 
      className="flex flex-col h-full"
      sx={{ 
        backgroundColor: colors.background.secondary,
        width: isSidebarOpen ? "260px" : "0px",
        transition: "width 0.2s ease-in-out",
        borderRight: `1px solid ${colors.border.divider}`,
      }}
    >
    

      {/* Sidebar Content */}
      {isSidebarOpen && (
        <Stack sx={{ height: "calc(100% - 48px)", overflow: "hidden", backgroundColor: colors.background.secondary }}>
          {/* Action Buttons */}
          

          {/* Chat List */}
          <Stack 
            className="overflow-auto"
            sx={{ 
              
              flexGrow: 1,
              p: 2,
              gap: 1,
              marginTop: 5,
            }}
          >
            {chats.map((chat) => (
              <ChatsListItem
                key={chat.id}
                chat={chat}
                active={chat.id === currentChatId}
                onDelete={onDeleteHandler}
                onClick={() => onChatClick(chat)}
              />
            ))}
          </Stack>
        </Stack>
      )}
    </Stack></>
  );
};
