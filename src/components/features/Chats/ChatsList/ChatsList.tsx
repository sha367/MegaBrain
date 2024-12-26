import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

import { IChat } from "@/api/v1";
import { useChatsStore } from "@/store";

import { ChatsListItem } from "./ui";

/**
 * Chats list component
 */
export const ChatsList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const match = location.pathname.match(/\/chat\/(\d+)/);
  const currentChatId = match ? match[1] : null;

  const { chats, refetchChats, deleteChat } = useChatsStore();

  useEffect(() => {
    refetchChats();
  }, [refetchChats]);

  const onChatClick = (chat: IChat) => {
    navigate(`/chat/${chat.id}`);
  }

  const onDeleteHandler = (chat: IChat) => {
    deleteChat(chat);
  }

  return (
    <Stack className="flex flex-col w-48 h-full bg-gray-200 p-2 gap-2 overflow-auto flex-shrink-0">
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>New chat</Button>
      {chats.map((chat) => (
        <ChatsListItem
          key={chat.id}
          chat={chat}
          active={chat.id === currentChatId}
          onDelete={onDeleteHandler}
          onClick={onChatClick}
        />
      ))}
    </Stack>
  );
};
