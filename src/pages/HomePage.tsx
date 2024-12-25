import { CREATE_CHAT } from "@/api/v1";
import { useChatsStore } from "@/store";
import { Button, Input, Stack, Typography } from "@mui/material";
import { useState } from "react";

export const HomePage = () => {
  const { refetchChats } = useChatsStore();
  const [newChatName, setNewChatName] = useState('');

  const createNewChat = async () => {
    try {
      const response = await CREATE_CHAT({ name: newChatName, model: 'defaultModel:latest' });

      if (!response?.data) {
        throw new Error('No response from server');
      }

      refetchChats();
      setNewChatName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap='.5rem'>
      <Typography variant="h2">Home Page</Typography>
      <Input value={newChatName} onChange={(e) => setNewChatName(e.target.value)} />
      <Button variant="contained" color="primary" onClick={() => createNewChat()}>Create new Chat</Button>
    </Stack>
  );
};
