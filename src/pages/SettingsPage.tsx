import { ModelCard } from "@/components/features/Models";
import { useModelsStore } from "@/store/useModelsStore";
import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export const SettingsPage = () => {
  const { models, recommendedModels, refetchModels } = useModelsStore();

  useEffect(() => {
    refetchModels();
  }, []);

  return (
    <Stack gap='.5rem' className="p-4 grow-1 items-center">
      <Typography variant='h2' className='text-xl!'>Settings</Typography>

      <Stack flexDirection='row' gap='2rem' justifyContent='space-between' className='grow-1 overflow-hidden'>
        <Stack gap='.5rem'>
          <h3>Recommended models:</h3>
          <Stack gap='.5rem' className='overflow-auto w-56'>
            <Stack gap='.5rem'>
              {recommendedModels.map(model => (
                <ModelCard key={model.name} model={model} onChanged={() => refetchModels()} />
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Stack gap='.5rem'>
          <h3>Downloaded models:</h3>
          <Stack gap='.5rem' className='overflow-auto w-56'>
            <Stack gap='.5rem'>
              {models.map(model => (
                <ModelCard key={model.name} model={model} isDownloaded onChanged={() => refetchModels()} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
