import { Stack, Typography, Box } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { useModelsStore } from "@/store/useModelsStore";
import { ModelCard } from "@/components/features/Models";

export const LLMSettings = () => {
  const { theme } = useTheme();
  const { colors } = theme;
  const { models, recommendedModels, refetchModels } = useModelsStore();

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
          Model Selection
        </Typography>
        <Typography variant="body1" sx={{ color: colors.text.secondary, marginBottom: "2rem" }}>
          Configure your preferred LLM chat & embedding provider settings.
        </Typography>
        
        <Stack direction="row" spacing={4}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
              Recommended Models
            </Typography>
            <Box 
              sx={{ 
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
              }}
            >
              {recommendedModels.map((model) => (
                <ModelCard 
                  key={model.name} 
                  model={model} 
                  onChanged={() => refetchModels()} 
                />
              ))}
            </Box>
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
              Downloaded Models
            </Typography>
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
                  isDownloaded 
                  onChanged={() => refetchModels()} 
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}; 