import { Stack, Typography } from "@mui/material";
import { lightTheme } from "@/theme/colors";

export const AppHeader = () => {
  const { colors } = lightTheme;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 2,
        py: 1,
        backgroundColor: colors.background.secondary,
        borderBottom: `1px solid ${colors.border.divider}`,
        WebkitAppRegion: "drag",
        minHeight: "48px",
        position: "relative"
      }}
    >
      {/* Title - Centered */}
      <Typography
        variant="subtitle1"
        sx={{
          color: colors.text.primary,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        Chat
        <span style={{ color: colors.text.secondary }}>›</span>
      </Typography>
    </Stack>
  );
};
