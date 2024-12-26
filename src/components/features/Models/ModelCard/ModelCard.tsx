import { BASE_URL } from "@/lib/utils/apiClient";
import { Button, Stack } from "@mui/material";
import { useCallback, useState } from "react";
import { IModel } from "server/controllers/ModelsControllers";

interface IModelCardProps {
  model: IModel;
  isDownloaded?: boolean;
  onChanged?: () => void;
}

export const ModelCard = (props: IModelCardProps) => {
  const { model, isDownloaded, onChanged } = props

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const calculateProgress = (data: { completed?: number; total?: number }) => {
    if (data.completed && data.total) {
      return Math.floor((data.completed / data.total) * 100);
    }

    return 0;
  }

  const handleDownload = useCallback(async () => {
    setIsLoading(true);
    setProgress(0);

    console.log('FUCK', model.name);

    try {
      const response = await fetch(`${BASE_URL}/api/model/pull`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model.name }),
      });

      if (!response.body) {
        throw new Error("No response body from server");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          try {
            const parsed = JSON.parse(chunk);
            setProgress(calculateProgress(parsed)); // Обновляем статус
          } catch (error) {
            console.error("Error parsing chunk:", chunk);
          }
        }
      }
    } catch (error) {
      console.error("Error pulling model:", error);
      setLoadingStatus("Error occurred while pulling model");
    } finally {
      setIsLoading(false);
      onChanged?.();
    }
  }, [model.name, onChanged]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    setLoadingStatus('');

    try {
      const response = await fetch(`${BASE_URL}/api/model/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model.name }),
      });

      if (response.ok) {
        const data = await response.json();
        setLoadingStatus(data.message);
      } else {
        const errorData = await response.json();
        setLoadingStatus(errorData.message || "Unknown error occurred");
      }
    } catch (error) {
      setLoadingStatus("Error deleting model. Please try again.");
      console.error("Error deleting model:", error);
    } finally {
      setIsLoading(false);
      onChanged?.();
    }
  }, [model.name, onChanged]);

  return (
    <Stack key={model.name} className="border rounded-xl p-2">
      <p>{model.name}</p>

      {loadingStatus && <p className="text-gray-500">{loadingStatus}</p>}
      {progress > 0 && <progress value={progress} max="100" />}

      {
        isDownloaded
          ? <Button
              disabled={isLoading}
              color='error'
              onClick={() => handleDelete()}
            >Delete</Button>
          : <Button
              disabled={isLoading}
              onClick={() => handleDownload()}
            >Download</Button>
      }
    </Stack>
  );
}
