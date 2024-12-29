import { CircularProgress } from "@mui/material";

export const AppLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
      <CircularProgress />
    </div>
  );
}
