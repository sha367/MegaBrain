import { Stack } from "@mui/material";
import { AppRouterView } from "./router";
import { HashRouter } from "react-router-dom";
import { AppHeader, ChatsList } from "./components";

export const App = () => {
  return (
    <HashRouter>
      <Stack className="relative flex flex-col h-screen bg-gray-100">
        <AppHeader />

        <Stack direction="row" className="flex-grow h-full overflow-hidden">
          <ChatsList />
          <AppRouterView />
        </Stack>
      </Stack>
    </HashRouter>
  );
};
