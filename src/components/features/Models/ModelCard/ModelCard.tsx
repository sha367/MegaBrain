import { BASE_URL } from "@/lib/utils/apiClient";
import { Stack, Typography, LinearProgress, IconButton, Chip } from "@mui/material";
import { useCallback, useState } from "react";
import { IModel } from "server/controllers/ModelsControllers";
import { DeleteOutline, Download, Memory, Storage } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
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
    setIsLoading(true);
    setProgress(0);

    console.log('FUCK', model);

    try {
      const response = await fetch(`${BASE_URL}/api/model/pull`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model.name }),
      });

      if (!response.body) {
        throw new Error("No response body from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          try {
            const parsed = JSON.parse(chunk);
            setProgress(calculateProgress(parsed)); // Обновляем статус
          } catch (error) {
            console.error("Error parsing chunk:", chunk);
          }
        }
      }
    } catch (error) {
      console.error("Error pulling model:", error);
      setLoadingStatus("Error occurred while pulling model");
    } finally {
      setIsLoading(false);
      onChanged?.();
    }
  }, [model.name, onChanged]);

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
          icon={<Storage sx={{ fontSize: 16 }} />}
          label={formatSize(model.size)}
          size="small"
          variant="outlined"
        />
        {model.details?.quantization_level && <Chip
          icon={<Memory sx={{ fontSize: 16 }} />}
          label={model.details?.quantization_level}
          size="small"
          variant="outlined"
        />}
      </Stack>}

      {isDownloaded && <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Context: {model?.details?.parameter_size?.toLocaleString()} 
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          •
        </Typography>
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          Type: {model.details?.family}
        </Typography>
      </Stack>}

      {loadingStatus && (
        <Typography variant="caption" sx={{ color: colors.text.secondary }}>
          {loadingStatus}
        </Typography>
      )}
      
      {progress > 0 && (
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 4, borderRadius: 2 }}
        />
      )}
    </Stack>
  );
};
