import { Stack } from "@mui/material";
import { AppRouterView } from "./router";
import { HashRouter } from "react-router-dom";
import { ChatsList } from "./components";
import { useEffect, useState } from "react";
import { AppLoader } from "./components/shared";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModelDownloadManager } from "./components/features/Models/ModelDownloadManager/ModelDownloadManager";

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
    <ThemeProvider>
      <HashRouter>
        {loading
          ? <AppLoader />
          : (
            <Stack className="relative flex flex-col h-screen bg-gray-100">
              {/* <AppHeader /> */}

              <Stack direction="row" className="flex-grow h-full overflow-hidden">
                <ChatsList />
                <AppRouterView />
              </Stack>
              <ModelDownloadManager />
            </Stack>
          )
        }
      </HashRouter>
    </ThemeProvider>
  );
};
