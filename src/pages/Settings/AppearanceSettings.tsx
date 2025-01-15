import { Stack, Typography, Box, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { DarkMode, LightMode, SettingsBrightness } from "@mui/icons-material";

export const AppearanceSettings = () => {
  const { theme, themeMode, setThemeMode } = useTheme();
  const { colors } = theme;

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
          Theme
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
                  Light Mode
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
                  Dark Mode
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
                  System Default
                </Typography>
              </Stack>
            }
          />
        </RadioGroup>
      </Box>
    </Stack>
  );
}; 