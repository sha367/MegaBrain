import { Stack } from "@mui/material";
import { AppRouterView } from "./router";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ChatsList } from "./components";
import { useEffect, useState } from "react";
import { AppLoader } from "./components/shared";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { ModelDownloadManager } from "./components/features/Models/ModelDownloadManager/ModelDownloadManager";
import { ErrorSnackbar } from "@/components/shared/ErrorSnackbar/ErrorSnackbar";

const AppContent = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.ipcRenderer?.invoke("get:loading").then((loading) => {
      setLoading(loading.value);
    });

    window.ipcRenderer?.on("set-loading", (_, loading) => {
      setLoading(loading.value);
    });
  }, []);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <Stack className="relative flex flex-col h-screen">
          {/* <AppHeader /> */}
          <Stack 
            direction="row" 
            className="flex-grow h-full overflow-hidden"
            sx={{ 
              backgroundColor: colors.background.primary,
            }}
          >
            <ChatsList />
            <AppRouterView />
          </Stack>
          <ModelDownloadManager />
          <ErrorSnackbar />
        </Stack>
      )}
    </>
  );
};

export const App = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ThemeProvider>
  );
};
