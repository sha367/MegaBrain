import { CREATE_CHAT } from "@/api/v1";
import { useChatsStore } from "@/store";
import { useModelsStore } from "@/store/useModelsStore";
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { lightTheme } from "../theme/colors";

export const CreateChatPage = () => {
  const { colors } = lightTheme;
  const { refetchChats } = useChatsStore();
  const [newChatName, setNewChatName] = useState("");
  const { models, refetchModels } = useModelsStore();
  const [selectedModel, setSelectedModel] = useState<{ label: string; value: string } | null>(null);

  const createNewChat = async () => {
    try {
      if (!selectedModel) {
        throw new Error("No model selected");
      }

      const response = await CREATE_CHAT({ name: newChatName, model: selectedModel.value });
      if (!response?.data) {
        throw new Error("No response from server");
      }

      refetchChats();
      setNewChatName("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refetchModels();
  }, []);

  useEffect(() => {
    const availableModel = models[0];
    if (availableModel) {
      setSelectedModel({ label: availableModel.name, value: availableModel.name });
    } else {
      setSelectedModel(null);
    }
  }, [models]);

  const modelSelectOption = useMemo(
    () => models.map((model) => ({ label: model.name, value: model.name })),
    [models]
  );

  return (
    <Stack
      gap="2rem"
      className="p-8 grow-1 justify-center items-center"
      sx={{ backgroundColor: colors.background.primary }}
    >
      <Typography 
        variant="h1" 
        sx={{ 
          color: colors.text.primary,
          fontSize: "2.25rem",
          fontWeight: 600,
          textAlign: "center",
          mb: 4
        }}
      >
        What can I help with?
      </Typography>

      <Stack gap="1rem" sx={{ maxWidth: "600px", width: "100%" }}>
        {!models.length ? (
          <Stack className="text-center items-center" gap={1}>
            <Typography variant="h5" sx={{ color: colors.text.primary }}>
              No ollama models found
            </Typography>
            <Typography sx={{ color: colors.text.secondary }}>
              Go to{" "}
              <Link to="/settings" style={{ color: colors.accent.main }}>
                Settings
              </Link>{" "}
              and load some
            </Typography>
          </Stack>
        ) : (
          <>
            <Autocomplete
              value={selectedModel}
              onChange={(_, newValue) => setSelectedModel(newValue)}
              disablePortal
              options={modelSelectOption}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: colors.background.input,
                  borderColor: colors.border.input,
                  "&:hover": {
                    borderColor: colors.accent.main
                  }
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a model"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: colors.text.placeholder
                    }
                  }}
                />
              )}
            />

            <TextField
              disabled={!models.length}
              label="Message MegaChat"
              size="medium"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createNewChat()}
              sx={{
                backgroundColor: colors.background.input,
                "& .MuiOutlinedInput-root": {
                  borderColor: colors.border.input,
                  "&:hover": {
                    borderColor: colors.accent.main
                  }
                },
                "& .MuiInputLabel-root": {
                  color: colors.text.placeholder
                }
              }}
            />

            <Button
              variant="contained"
              onClick={createNewChat}
              disabled={newChatName.trim().length === 0 || !models.length || !selectedModel}
              sx={{
                backgroundColor: colors.accent.button,
                color: colors.text.buttonText,
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: colors.accent.main,
                  color: "#FFFFFF"
                },
                "&:disabled": {
                  backgroundColor: colors.background.secondary,
                  color: colors.text.secondary
                }
              }}
            >
              Start Chat
            </Button>
          </>
        )}
      </Stack>
    </Stack>
  );
};
