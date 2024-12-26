import { CREATE_CHAT } from "@/api/v1";
import { useChatsStore } from "@/store";
import { useModelsStore } from "@/store/useModelsStore";
import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export const CreateChatPage = () => {
  const { refetchChats } = useChatsStore();
  const [newChatName, setNewChatName] = useState('');

  const { models, refetchModels } = useModelsStore();

  const [selectedModel, setSelectedModel] = useState<{ label: string, value: string } | null>(null);

  const createNewChat = async () => {
    try {
      if (!selectedModel) {
        throw new Error('No model selected');
      }

      const response = await CREATE_CHAT({ name: newChatName, model: selectedModel.value });

      if (!response?.data) {
        throw new Error('No response from server');
      }

      refetchChats();
      setNewChatName('');
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

  const modelSelectOption = useMemo(() => models.map(model => ({ label: model.name, value: model.name })), [models]);

  return (
    <Stack gap='.5rem' className="p-4 grow-1 justify-center items-center">
      <Stack gap='.5rem' className='max-w-[560px] w-full'>
        {!models.length &&
          <Stack className="text-center items-center">
            <Typography variant='h4'>No ollama models found</Typography>
            <Typography>Go to <Link to='/settings' className="text-blue-500">Settings</Link> and load some</Typography>
          </Stack>
        }

        {
          models.length && (
            <Autocomplete
              value={selectedModel}
              onChange={(_, newValue) => setSelectedModel(newValue || null)}
              disablePortal
              options={modelSelectOption}
              className='w-full'
              renderInput={(params) => <TextField {...params} label="Ollama model to chat with" />}
            />
          )
        }

        <TextField
          disabled={!models.length}
          label="Chat name"
          size="small"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && createNewChat()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => createNewChat()}
          disabled={newChatName.trim().length === 0 || !models.length || !selectedModel}
        >Create new Chat</Button>
      </Stack>
    </Stack>
  );
};
