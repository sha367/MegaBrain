import { Stack } from "@mui/material";
import { AppRouterView } from "./router";
import { HashRouter } from "react-router-dom";
import { AppHeader, ChatsList } from "./components";
import { useEffect, useState } from "react";
import { AppLoader } from "./components/shared";

export const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.ipcRenderer?.invoke('get:loading').then((loading) => {
      setLoading(loading.value);
    });

    window.ipcRenderer?.on('set-loading', (_, loading) => {
      setLoading(loading.value);
    });
  }, []);

  return (
    <HashRouter>
      {loading
        ? <AppLoader />
        : (
          <Stack className="relative flex flex-col h-screen bg-gray-100">
            <AppHeader />

            <Stack direction="row" className="flex-grow h-full overflow-hidden">
              <ChatsList />
              <AppRouterView />
            </Stack>
          </Stack>
        )
      }
    </HashRouter>
  );
};
