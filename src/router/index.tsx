import { Routes, Route } from "react-router-dom";
import { ChatPage } from "@/pages/ChatPage";
import { NewChatPage } from "@/pages/NewChatPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { CreateChatPage } from "@/pages/CreateChatPage";
import { AppearanceSettings } from "@/pages/Settings/AppearanceSettings";
import { LLMSettings } from "@/pages/Settings/LLMSettings";
import { AboutSettings } from "@/pages/Settings/AboutSettings";

export const AppRouterView = () => {

  return (
    <Routes>
      <Route path="/" element={<CreateChatPage />} />

      <Route path="/newChat" element={<NewChatPage />} />
      <Route path="/chat/:id" element={<ChatPage />} />
      <Route path="/settings" element={<SettingsPage />}>
            <Route path="appearance" element={<AppearanceSettings />} />
            <Route path="llm" element={<LLMSettings />} />
            <Route path="about" element={<AboutSettings />} />
      </Route>
    </Routes>
  );
};
