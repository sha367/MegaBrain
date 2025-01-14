import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { FiSidebar as MenuIcon} from "react-icons/fi";
import { BiSolidEdit as EditNoteIcon } from "react-icons/bi";
import SettingsIcon from "@mui/icons-material/Settings";
import { IChat } from "@/api/v1";
import { useChatsStore } from "@/store";
import { ChatsListItem } from "./ui";
import { SearchBar } from "@/components/widgets/SearchBar/SearchBar";
import { useTheme } from "@/context/ThemeContext";
/**
 * Chats list component
 */
export const ChatsList = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState<IChat[]>([]);

  const match = location.pathname.match(/\/chat\/(\d+)/);
  const currentChatId = match ? match[1] : null;

  const { chats, refetchChats, deleteChat } = useChatsStore();

  useEffect(() => {
    refetchChats();
  }, [refetchChats]);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const filtered = chats.filter(chat => 
      chat.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [chats]);

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
        WebkitAppRegion: "drag",
        "& .MuiIconButton-root": {
          WebkitAppRegion: "no-drag"
        },
        // backgroundColor: colors.background.primary,
        zIndex: 1000,
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
            <MenuIcon />
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
            <EditNoteIcon sx={{ fontSize: 25 }} />
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
        minWidth: isSidebarOpen?"260px": "0px",
        transition: "width 0.2s ease-in-out",
        borderRight: `1px solid ${colors.border.divider}`,
        zIndex: 999,
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
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search"
            />
            {filteredChats.map((chat) => (
              <ChatsListItem
                key={chat.id}
                chat={chat}
                active={chat.id === currentChatId}
                onDelete={onDeleteHandler}
                onClick={() => onChatClick(chat)}
              />
            ))}
            {searchQuery && filteredChats.length === 0 && (
              <Typography
                variant="body2"
                sx={{
                  color: colors.text.secondary,
                  textAlign: "center",
                  py: 2
                }}
              >
                No chats found
              </Typography>
            )}
          </Stack>
        </Stack>
      )}
    </Stack></>
  );
};
