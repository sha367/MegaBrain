import { Routes, Route } from "react-router-dom";
import { ChatPage } from "@/pages/ChatPage";
import { NewChatPage } from "@/pages/NewChatPage";
import { SettingsPage } from "@/pages/SettingsPage";

export const AppRouterView = () => {

  return (
    <Routes>
      <Route path="/" element={<NewChatPage />} />

      <Route path="/chat" element={<NewChatPage />} />
      <Route path="/chat/:id" element={<ChatPage />} />

      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};
