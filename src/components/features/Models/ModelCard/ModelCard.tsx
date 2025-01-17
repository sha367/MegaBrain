import { Stack, Typography, LinearProgress, IconButton, Chip, Box, Tooltip } from "@mui/material";
import { useState } from "react";
import { IModel } from "server/controllers/ModelsControllers";
import { DeleteOutline, Download, Memory, Storage, Schedule, Timer, Warning, Psychology } from "@mui/icons-material";
import { useTheme } from "@/context/ThemeContext";
import { downloadStore } from "@/store/modelDownloadStore";
import { useSnapshot } from "valtio";
import { downloadedModelsStore } from "@/store/downloadedModelsStore";
import { formatDistanceToNow, parseISO, isValid } from "date-fns";
import { ReadmeModal } from "../ReadmeModal/ReadmeModal";
import { formatEstimatedTime } from "@/utils/formatters";
import { useDeviceRAM } from "@/hooks/useDeviceRAM";
import { isTopModel } from "@/constants/topModels";
import { BASE_URL } from "@/lib/utils/apiClient";

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

const formatUpdateTime = (updated: string): string => {
  try {
    // Try parsing as ISO date first
    const date = parseISO(updated);
    if (isValid(date)) {
      return `Updated ${formatDistanceToNow(date)} ago`;
    }

    // If it's already a relative time string (e.g., "3 months ago")
    if (updated.toLowerCase().includes("ago")) {
      return `Updated ${updated}`;
    }

    // Fallback
    return updated;
  } catch (error) {
    console.error("Error formatting date:", error);
    return updated;
  }
};

export const ModelCard = (props: IModelCardProps) => {
  const [readmeOpen, setReadmeOpen] = useState(false);
  const { theme } = useTheme();
  const { colors } = theme;
  const { model, onChanged } = props;
  const { models: downloadedModels, modelsDetails } = useSnapshot(downloadedModelsStore.state);
  const { downloads } = useSnapshot(downloadStore.state);
  const isDownloaded = downloadedModels.includes(model.name);
  const modelDetails = modelsDetails.find(m => m.name === model.name);
  const downloadStatus = downloads[model.name];
  const totalRAM = useDeviceRAM();
  console.log("model",model);
  console.log("modelDetails",modelDetails);
  const hasReadme = Boolean(model?.readme);
  const handleDownload = () => {
    if (!isDownloaded && !downloadStatus) {
      downloadStore.actions.queueDownload({"name":model.name});
    }
  };

  const handleDelete = async () => {
    if (isDownloaded) {
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
      } else {
        const errorData = await response.json();
        // setLoadingStatus(errorData.message || "Unknown error occurred");
      }
   
        // await OLLAMA.DELETE({ name: model.name });
        downloadedModelsStore.actions.removeModel(model.name);
        onChanged?.();
      } catch (error) {
        console.error("Error deleting model:", error);
      }
    }
  };

  const getModelSize = (): number => {
    if (model.tags && model.tags.length > 0) {
      return model.tags.filter((t:IModel)=>t.name == model.name)[0]?.size;
     
    }
    return 0;
  };

  const shouldShowWarning = (): boolean => {
    const modelSize = getModelSize();
    // Convert model size to GB for comparison (assuming modelSize is in bytes)
    const modelSizeGB = modelSize / (1024 * 1024 * 1024);
    // Show warning if model size is more than 70% of available RAM
    return totalRAM > 0 && modelSizeGB > (totalRAM * 0.7);
  };

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        border: `1px solid ${colors.border.divider}`,
        borderRadius: 1,
        backgroundColor: colors.background.paper,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography 
            variant="subtitle1" 
            component={hasReadme ? "button" : "div"}
            onClick={hasReadme ? () => setReadmeOpen(true) : undefined}
            sx={{ 
              color: colors.text.primary,
              ...(hasReadme && {
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                font: "inherit",
                textAlign: "left",
                "&:hover": {
                  color: colors.primary,
                },
              }),
            }}
          >
            {model.name}
          </Typography>
          {shouldShowWarning() && (
            <Tooltip title={`This model may run slowly on your device (${totalRAM}GB RAM available)`}>
              <Warning sx={{ 
                color: colors.warning,
                fontSize: 20,
              }} />
            </Tooltip>
          )}
        </Stack>
        {isDownloaded ? (
          <IconButton onClick={handleDelete} sx={{ color: colors.error }}>
            <DeleteOutline />
          </IconButton>
        ) : (
          <IconButton 
            onClick={handleDownload} 
            disabled={!!downloadStatus}
            sx={{ color: colors.text.primary }}
          >
            <Download />
          </IconButton>
        )}
      </Stack>

      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
        {model?.description}
      </Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {isDownloaded && modelDetails?.size && (
          <Chip
            icon={<Storage sx={{ fontSize: 16 }} />}
            label={formatSize(modelDetails?.size?.toString() ?? "")}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {!isDownloaded && model?.tags?.length > 0 && (
          <Chip
            icon={<Storage sx={{ fontSize: 16 }} />}
            label={model.tags.filter((t:IModel)=>t.name == model.name)[0]?.sizeHumanReadable ?? ""}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {model.pullCount && (
          <Chip
            icon={<Memory sx={{ fontSize: 16 }} />}
            label={`${model.pullCount} Pulls`}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {model?.updated && (
          <Chip
            icon={<Schedule sx={{ fontSize: 16 }} />}
            label={formatUpdateTime(model?.updated)}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
        {model.size && (
          <Chip
            icon={<Storage sx={{ fontSize: 16 }} />}
            label={model.size}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
         {/* Add capabilities chips */}
         {model.capabilities?.split(",").map((capability: string) => (
          <Chip
            key={capability.trim()}
            icon={<Psychology sx={{ fontSize: 16 }} />}
            label={capability.trim()}
            size="small"
            color="secondary"
            variant="outlined"
            sx={{
              borderColor: colors.border.divider,
              color: colors.text.secondary,
              "& .MuiChip-icon": {
                color: colors.text.secondary,
              },
            }}
          />
        ))}
        {!isDownloaded && getModelSize() > 0 && (
          <Chip
            icon={<Timer sx={{ fontSize: 16 }} />}
            label={formatEstimatedTime(getModelSize())}
            size="small"
            color="primary"
            variant="outlined"
          />
        )}
      </Stack>

      
      {downloadStatus && (
        <Box>
          <LinearProgress 
            variant="determinate" 
            value={downloadStatus.progress} 
            sx={{ mb: 1 }}
          />
          <Typography variant="caption" sx={{ color: colors.text.secondary }}>
            {downloadStatus.status === "downloading" 
              ? `Downloading: ${downloadStatus.progress.toFixed(1)}%`
              : downloadStatus.status}
          </Typography>
        </Box>
      )}

      <ReadmeModal
        open={readmeOpen}
        onClose={() => setReadmeOpen(false)}
        title={model.name}
        content={model?.readme ?? ""}
      />

     
    </Stack>
  );
};
