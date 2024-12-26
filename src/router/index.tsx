import { Routes, Route } from "react-router-dom";
import { ChatPage } from "@/pages/ChatPage";
import { NewChatPage } from "@/pages/NewChatPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { CreateChatPage } from "@/pages/CreateChatPage";

export const AppRouterView = () => {

  return (
    <Routes>
      <Route path="/" element={<CreateChatPage />} />

      <Route path="/newChat" element={<NewChatPage />} />
      <Route path="/chat/:id" element={<ChatPage />} />

      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};
