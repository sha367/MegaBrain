import { Stack, Typography, Box, Link, Chip } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";
import { GitHub, BugReport, Code } from "@mui/icons-material";

export const AboutSettings = () => {
  const { theme } = useTheme();
  const { colors } = theme;

  const version = "1.0.0"; // You can import this from your package.json
  const buildDate = new Date().toLocaleDateString(); // You might want to use an actual build date

  return (
    <Stack spacing={4}>
      <Box>
        <Typography variant="h6" sx={{ color: colors.text.primary, marginBottom: "1rem" }}>
          About MegaBrain
        </Typography>
        <Typography variant="body1" sx={{ color: colors.text.secondary, marginBottom: "2rem" }}>
          A modern chat interface for Ollama models
        </Typography>

        <Stack spacing={3}>
          {/* Version Info */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.text.primary, marginBottom: 1 }}>
              Version Information
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Chip 
                label={`Version ${version}`}
                size="small"
                sx={{ 
                  backgroundColor: colors.background.secondary,
                  color: colors.text.secondary
                }}
              />
              <Chip 
                label={`Built ${buildDate}`}
                size="small"
                sx={{ 
                  backgroundColor: colors.background.secondary,
                  color: colors.text.secondary
                }}
              />
            </Stack>
          </Box>

          {/* Links */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.text.primary, marginBottom: 1 }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              <Link
                href="https://github.com/sha367/MegaBrain"
                target="_blank"
                rel="noopener"
                sx={{
                  color: colors.text.secondary,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: colors.primary
                  }
                }}
              >
                <GitHub fontSize="small" />
                GitHub Repository
              </Link>
              <Link
                href="https://github.com/sha367/MegaBrain/issues"
                target="_blank"
                rel="noopener"
                sx={{
                  color: colors.text.secondary,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: colors.primary
                  }
                }}
              >
                <BugReport fontSize="small" />
                Report an Issue
              </Link>
              <Link
                href="https://github.com/sha367/MegaBrain/blob/main/LICENSE"
                target="_blank"
                rel="noopener"
                sx={{
                  color: colors.text.secondary,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: colors.primary
                  }
                }}
              >
                <Code fontSize="small" />
                License
              </Link>
            </Stack>
          </Box>

          {/* System Info */}
          <Box>
            <Typography variant="subtitle2" sx={{ color: colors.text.primary, marginBottom: 1 }}>
              System Information
            </Typography>
            <Stack 
              spacing={1}
              sx={{ 
                backgroundColor: colors.background.secondary,
                p: 2,
                borderRadius: 1
              }}
            >
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Platform: {window.navigator.platform}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                User Agent: {window.navigator.userAgent}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Language: {window.navigator.language}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}; 