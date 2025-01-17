import React, { useEffect } from "react";
import { Stack, Typography, LinearProgress, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSnapshot } from "valtio";
import { downloadStore } from "@/store/modelDownloadStore";
import { useTheme } from "@/context/ThemeContext";
import { useModelsStore } from "@/store/useModelsStore";

export const ModelDownloadManager: React.FC = () => {
  const { theme } = useTheme();
  const { refetchModels } = useModelsStore();
  const { colors } = theme;
  const { downloads } = useSnapshot(downloadStore.state);
  useEffect(() => {
    refetchModels();
  }, [downloads]);
  if (Object.keys(downloads).length === 0) return null;

  return (
    <Stack
      sx={{
        position: "fixed",
        bottom: 20,
        right: 20,
        maxWidth: 300,
        bgcolor: colors.background.primary,
        borderRadius: 2,
        border: `1px solid ${colors.border.divider}`,
        p: 2,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      spacing={2}
    >
      <Typography variant="subtitle2" color={colors.text.primary}>
        Download Manager
      </Typography>
      {Object.entries(downloads).map(([modelName, task]) => (
        <Stack key={modelName} spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color={colors.text.primary} noWrap>
              {modelName}
            </Typography>
            {task.status === "completed" && (
              <IconButton
                size="small"
                onClick={() => downloadStore.actions.removeDownload(modelName)}
              >
                <Close fontSize="small" />
              </IconButton>
            )}
          </Stack>
          <LinearProgress
            variant="determinate"
            value={task.progress}
            color={
              task.status === "error" ? "error" :
              task.status === "completed" ? "success" : "primary"
            }
          />
          {task.error && (
            <Typography variant="caption" color="error">
              {task.error}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
}; 