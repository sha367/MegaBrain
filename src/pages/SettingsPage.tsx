import { GET_MODELS, GET_RECOMMENDED_MODELS } from "@/api/v1/models";
import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { IModel } from "server/controllers/ModelsControllers";

export const SettingsPage = () => {
  const [recommendedModels, setRecommendedModels] = useState<IModel[]>([]);
  const [models, setModels] = useState<IModel[]>([]);

  const getRecommendedModels = async () => {
    try {
      const response = await GET_RECOMMENDED_MODELS({});

      if (!response?.data?.models) {
        throw new Error('No data');
      }

      setRecommendedModels(response.data.models || []);
    } catch (error) {
      console.error(error);
    }
  }

  const getModels = async () => {
    try {
      const response = await GET_MODELS({});

      if (!response?.data?.models) {
        throw new Error('No data');
      }

      setModels(response.data.models || []);
    } catch (error) {
      console.error(error);
    }
  }

  const recommendedNonDownloadedList = useMemo(() => {
    return recommendedModels.filter(model => !models.find(m => m.name === model.name));
  }, [recommendedModels, models]);

  useEffect(() => {
    getRecommendedModels();
    getModels();
  }, []);

  return (
    <Stack gap='.5rem'>
      <h2>Settings Page</h2>
      <Stack gap='.5rem'>
        <h3>Recommended models:</h3>
        <Stack gap='.5rem'>
          {recommendedNonDownloadedList.map(model => (
            <Stack key={model.name} className="border rounded-xl p-2">
              <p>{model.name}</p>
              <Button onClick={() => console.log('Download', model.name)}>Download</Button>
            </Stack>
          ))}
        </Stack>
      </Stack>

      <Stack gap='.5rem'>
        <h3>Downloaded models:</h3>
        <Stack gap='.5rem' className="border rounded-xl p-2">
          {models.map(model => (
            <Stack key={model.name}>
              <p>{model.name}</p>
              <Button color='error' onClick={() => console.log('Delete', model.name)}>Delete</Button>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
