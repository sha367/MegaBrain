import { Stack, Typography, Box, CircularProgress, IconButton, FormControl, Select, MenuItem, SelectChangeEvent, TextField, InputAdornment, Divider, Switch, FormControlLabel } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { useOllamaLibrary } from "@/hooks/useOllamaLibrary";
import { ModelCard } from "@/components/features/Models";
import { formatDistanceToNow } from "date-fns";
import { RefreshRounded, Search } from "@mui/icons-material";
import { useSnapshot } from "valtio";
import { downloadedModelsStore } from "@/store/downloadedModelsStore";
import { useEffect, useMemo, useState } from "react";
import { ALLOWED_MODELS } from "@/constants/allowedModels";
import { TOP_CHAT_MODELS, isTopModel } from "@/constants/topModels";
import { useDeviceRAM } from "@/hooks/useDeviceRAM";
import { isModelSuitableForSystem } from "@/utils/systemInfo";

type SortOption = "downloadedFirst" | "nameAsc" | "nameDesc";

export const LLMSettings = () => {
  const { models, loading, error, lastFetched, refetch } = useOllamaLibrary();
  const { models: downloadedModels } = useSnapshot(downloadedModelsStore.state);
  const [sortOption, setSortOption] = useState<SortOption>("downloadedFirst");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHighMemoryModels, setShowHighMemoryModels] = useState(false);
  const systemMemory = useDeviceRAM();
  const { theme } = useTheme();
  const { colors } = theme;

  useEffect(() => {
    downloadedModelsStore.actions.fetchDownloadedModels();
  }, []);

  const handleModelChange = () => {
    refetch();
    downloadedModelsStore.actions.fetchDownloadedModels();
  };

  const { topModels, recommendedModels, otherModels } = useMemo(() => {
    const filtered = models.filter((model) => {
      // Allow all deepseek and qwen models
      if (model.name.toLowerCase().includes("deepseek") || 
          model.name.toLowerCase().includes("qwen")) {
        return true;
      }
      
      // Check against allowed models list for others
      if (!ALLOWED_MODELS.includes(model.name)) return false;
      
      if (!showHighMemoryModels && systemMemory) {
        const paramSize = model.name.split(":")[1];
        const isSuitable = isModelSuitableForSystem(paramSize, systemMemory);
        if (!isSuitable) return false;
      }
      
      const searchLower = searchQuery.toLowerCase();
      return (
        model.name.toLowerCase().includes(searchLower) ||
        model.description.toLowerCase().includes(searchLower) ||
        model.capabilities?.toLowerCase().includes(searchLower)
      );
    });

    const sortModels = (models: typeof filtered) => {
      return [...models].sort((a, b) => {
        const isADownloaded = downloadedModels.includes(a.name);
        const isBDownloaded = downloadedModels.includes(b.name);

        switch (sortOption) {
          case "nameAsc":
            return a.name.localeCompare(b.name);
          case "nameDesc":
            return b.name.localeCompare(a.name);
          case "downloadedFirst":
            if (isADownloaded === isBDownloaded) {
              return a.name.localeCompare(b.name);
            }
            return isADownloaded ? -1 : 1;
          default:
            return 0;
        }
      });
    };

    const sorted = sortModels(filtered);
    
    return {
      topModels: sorted.filter(model => isTopModel(model.name)),
      recommendedModels: systemMemory ? sorted.filter(model => {
        const paramSize = model.name.split(":")[1];
        return !isTopModel(model.name) && isModelSuitableForSystem(paramSize, systemMemory);
      }) : [],
      otherModels: sorted.filter(model => {
        const isTop = isTopModel(model.name);
        const isSuitable = systemMemory ? isModelSuitableForSystem(
          model.name.split(":")[1],
          systemMemory
        ) : false;
        return !isTop && !isSuitable;
      })
    };
  }, [models, downloadedModels, sortOption, searchQuery, systemMemory, showHighMemoryModels]);

  return (
    <Stack spacing={4} sx={{ marginBottom: "100px"}}>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ color: colors.text.primary }}>
            Available Models
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: colors.text.secondary }} />
                  </InputAdornment>
                ),
                sx: {
                  color: colors.text.primary,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.border.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.border.hover,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary,
                  },
                },
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showHighMemoryModels}
                  onChange={(e) => setShowHighMemoryModels(e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: colors.primary,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: colors.primary,
                    },
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: colors.text.secondary,
                    fontSize: "14px",
                  }}
                >
                  Show High Memory Models
                </Typography>
              }
            />
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={sortOption}
                onChange={(e: SelectChangeEvent<SortOption>) => setSortOption(e.target.value as SortOption)}
                sx={{ 
                  color: colors.text.primary,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.border.divider,
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.border.hover,
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: colors.primary,
                  },
                }}
              >
                <MenuItem value="nameAsc">Name (A to Z)</MenuItem>
                <MenuItem value="nameDesc">Name (Z to A)</MenuItem>
                <MenuItem value="downloadedFirst">Downloaded First</MenuItem>
              </Select>
            </FormControl>
            {lastFetched && (
              <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                Last updated {formatDistanceToNow(lastFetched)} ago
              </Typography>
            )}
            <IconButton 
              onClick={() => refetch()} 
              disabled={loading}
              sx={{ color: colors.text.secondary }}
            >
              <RefreshRounded />
            </IconButton>
          </Stack>
        </Stack>

        {loading && <CircularProgress />}
        {error && (
          <Typography color="error">
            Error loading models: {error}
          </Typography>
        )}

        {/* Top Models Section */}
        {topModels.length > 0 && (
          <ModelSection
            title="Top Models"
            badge="TOP"
            models={topModels}
            downloadedModels={downloadedModels}
            onModelChange={handleModelChange}
            colors={colors}
          />
        )}

        {/* Best for Your System Section */}
        {recommendedModels.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <ModelSection
              title="Best for Your System"
              badge="RECOMMENDED"
              models={recommendedModels}
              downloadedModels={downloadedModels}
              onModelChange={handleModelChange}
              colors={colors}
              subtitle={systemMemory ? `Optimized for your ${systemMemory}GB system` : undefined}
            />
          </>
        )}

        {/* Other Models Section */}
        {otherModels.length > 0 && (
          <>
            <Divider sx={{ my: 4 }} />
            <ModelSection
              title="All Models"
              models={otherModels}
              downloadedModels={downloadedModels}
              onModelChange={handleModelChange}
              colors={colors}
            />
          </>
        )}
      </Box>
    </Stack>
  );
};

// Helper component for model sections
interface ModelSectionProps {
  title: string;
  models: any[];
  downloadedModels: string[];
  onModelChange: () => void;
  colors: any;
  badge?: string;
  subtitle?: string;
}

const ModelSection = ({ 
  title, 
  models, 
  downloadedModels, 
  onModelChange, 
  colors,
  badge,
  subtitle 
}: ModelSectionProps) => (
  <>
    <Typography 
      variant="h6" 
      sx={{ 
        color: colors.text.primary,
        mb: subtitle ? 1 : 2,
        display: "flex",
        alignItems: "center",
        gap: 1
      }}
    >
      {badge && (
        <Box
          component="span"
          sx={{
            backgroundColor: colors.primary,
            color: colors.text.primary,
            padding: "2px 8px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {badge}
        </Box>
      )}
      {title}
    </Typography>
    
    {subtitle && (
      <Typography 
        variant="body2" 
        sx={{ 
          color: colors.text.secondary,
          mb: 2
        }}
      >
        {subtitle}
      </Typography>
    )}
    
    <Box 
      sx={{ 
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      {models.map((model) => (
        <ModelCard
          key={model.name}
          model={model}
          isDownloaded={downloadedModels.includes(model.name)}
          onChanged={onModelChange}
        />
      ))}
    </Box>
  </>
); 