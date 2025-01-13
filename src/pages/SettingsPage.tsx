import { ModelCard } from "@/components/features/Models";
import { useModelsStore } from "@/store/useModelsStore";
import { Stack, Typography, Box, Switch, FormControlLabel } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { DarkMode, LightMode } from "@mui/icons-material";

export const SettingsPage = () => {
  const { models, recommendedModels, refetchModels } = useModelsStore();
  const { theme, isDark, toggleTheme } = useTheme();
  const { colors } = theme;

  useEffect(() => {
    refetchModels();
  }, []);

  return (
    <Box sx={{
      flex: 1, 
      padding: "2rem",  
      minHeight: "100vh", 
      paddingTop: 7,
      backgroundColor: colors.background.primary,
    }}>
      <Typography variant="h4" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
        Settings
      </Typography>

      <Stack spacing={4}>
        {/* Theme Section */}
        <Box>
          <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
            Appearance
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isDark}
                onChange={toggleTheme}
                icon={<LightMode sx={{ color: colors.text.secondary }} />}
                checkedIcon={<DarkMode sx={{ color: colors.text.secondary }} />}
              />
            }
            label={
              <Typography sx={{ color: colors.text.secondary }}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </Typography>
            }
          />
        </Box>

        {/* Models Section */}
        <Box>
          <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
            LLM Preference
          </Typography>
          <Typography variant="body1" sx={{ color: colors.text.secondary, marginBottom: "2rem" }}>
            These are the settings for your preferred LLM chat & embedding provider.
          </Typography>
          <Stack direction="row" spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
                Recommended Models
              </Typography>
              <Stack spacing={2}>
                {recommendedModels.map((model) => (
                  <ModelCard key={model.name} model={model} onChanged={() => refetchModels()} />
                ))}
              </Stack>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
                Downloaded Models
              </Typography>
              <Stack spacing={2}>
                {models.map((model) => (
                  <ModelCard 
                    key={model.name} 
                    model={model} 
                    isDownloaded 
                    onChanged={() => refetchModels()} 
                  />
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
