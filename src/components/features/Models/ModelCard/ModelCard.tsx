import { BASE_URL } from "@/lib/utils/apiClient";
import { Stack, Typography, LinearProgress, IconButton, Chip } from "@mui/material";
import { useCallback, useState } from "react";
import { IModel } from "server/controllers/ModelsControllers";
import { DeleteOutline, Download, Memory, Storage } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import { downloadStore } from "@/store/modelDownloadStore";
import { useSnapshot } from "valtio";

interface IModelCardProps {
  model: IModel;
  isDownloaded?: boolean;
  onChanged?: () => void;
}

const formatSize = (sizeInBytes: string): string => {
  const bytes = parseInt(sizeInBytes);
  const mb = bytes / (1024 * 1024);
  return `${Math.round(mb)} MB`;
};

export const ModelCard = (props: IModelCardProps) => {
  const { theme } = useTheme();
  const { colors } = theme;
  const { model, isDownloaded, onChanged } = props;
  const downloadStatus = useSnapshot(downloadStore.state).downloads[model.name];

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [progress, setProgress] = useState(0);
  console.log('model'+isDownloaded, model);
  const calculateProgress = (data: { completed?: number; total?: number }) => {
    if (data.completed && data.total) {
      return Math.floor((data.completed / data.total) * 100);
    }

    return 0;
  }

  const handleDownload = useCallback(async () => {
    await downloadStore.actions.enqueueDownload({ name: model.name });
  }, [model.name]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    setLoadingStatus('');

    try {
      const response = await fetch(`${BASE_URL}/api/model/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model.name }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoadingStatus(data.message);
      } else {
        const errorData = await response.json();
        setLoadingStatus(errorData.message || "Unknown error occurred");
      }
    } catch (error) {
      setLoadingStatus("Error deleting model. Please try again.");
      console.error("Error deleting model:", error);
    } finally {
      setIsLoading(false);
      onChanged?.();
    }
  }, [model.name, onChanged]);

  return (
    <Stack
      key={model.name}
      sx={{
        border: `1px solid ${colors.border.divider}`,
        borderRadius: "12px",
        p: 2,
        backgroundColor: colors.background.secondary,
        transition: "all 0.2s ease-in-out",
        gap: 1,
        "&:hover": {
          backgroundColor: colors.background.input,
          transform: "translateY(-1px)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: colors.text.primary }}>
          {model.name}
        </Typography>
        {isDownloaded ? (
          <IconButton disabled={isLoading} color="error" onClick={handleDelete} size="small">
            <DeleteOutline />
          </IconButton>
        ) : (
          <IconButton disabled={isLoading} onClick={handleDownload} size="small" color="primary">
            <Download />
          </IconButton>
        )}
      </Stack>

      {isDownloaded && <Stack direction="row" spacing={1}>
        <Chip
          icon={<Storage sx={{ fontSize: 16, color: colors.text.secondary }} />}
          label={formatSize(model?.size?.toString() ?? '')}
          size="small"
          variant="outlined"
          sx={{
            color: colors.text.secondary,
            borderColor: colors.border.divider,
            "& .MuiChip-label": {
              color: colors.text.secondary,
            },
          }}
        />
        {model.details?.quantization_level && <Chip
          icon={<Memory sx={{ fontSize: 16, color: colors.text.secondary }} />}
          label={model.details?.quantization_level}
          size="small"
          variant="outlined"
          sx={{
            color: colors.text.secondary,
            borderColor: colors.border.divider,
            "& .MuiChip-label": {
              color: colors.text.secondary,
            },
          }}
        />}
      </Stack>}

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Context: {model?.details?.parameter_size?.toLocaleString()} 
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          •
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Type: {model.details?.family}
        </Typography>
      </Stack>

      {loadingStatus && (
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          {loadingStatus}
        </Typography>
      )}
      
      {downloadStatus && (
        <LinearProgress 
          variant="determinate" 
          value={downloadStatus.progress} 
          sx={{ height: 4, borderRadius: 2 }}
        />
      )}
    </Stack>
  );
};
