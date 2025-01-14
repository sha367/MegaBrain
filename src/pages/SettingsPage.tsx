import { ModelCard } from "@/components/features/Models";
import { useModelsStore } from "@/store/useModelsStore";
import { Stack, Typography, Box, Switch, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";

export const SettingsPage = () => {
  const { models, recommendedModels, refetchModels } = useModelsStore();
  const { theme, isDark, toggleTheme, themeMode, setThemeMode } = useTheme();
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
      overflowY: "auto",
      maxHeight: "100vh",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: colors.background.secondary,
      },
      "&::-webkit-scrollbar-thumb": {
        background: colors.border.divider,
        borderRadius: "4px",
        "&:hover": {
          background: colors.text.secondary,
        },
      },
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
          <RadioGroup
            value={themeMode}
            onChange={(e) => setThemeMode(e.target.value as "light" | "dark" | "system")}
          >
            <FormControlLabel
              value="light"
              control={
                <Radio 
                  size="small"
                  sx={{ color: colors.text.secondary }}
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <LightMode sx={{ color: colors.text.secondary }} />
                  <Typography sx={{ color: colors.text.secondary }}>
                    Light
                  </Typography>
                </Stack>
              }
            />
            <FormControlLabel
              value="dark"
              control={
                <Radio 
                  size="small"
                  sx={{ color: colors.text.secondary }}
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <DarkMode sx={{ color: colors.text.secondary }} />
                  <Typography sx={{ color: colors.text.secondary }}>
                    Dark
                  </Typography>
                </Stack>
              }
            />
            <FormControlLabel
              value="system"
              control={
                <Radio 
                  size="small"
                  sx={{ color: colors.text.secondary }}
                />
              }
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <SettingsBrightness sx={{ color: colors.text.secondary }} />
                  <Typography sx={{ color: colors.text.secondary }}>
                    System
                  </Typography>
                </Stack>
              }
            />
          </RadioGroup>
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
              <Box 
                sx={{ 
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
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
                  gridTemplateColumns: "repeat(2, 1fr)",
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
    </Box>
  );
};
