import { Alert, Snackbar } from "@mui/material";
import { useSnapshot } from "valtio";
import { errorStore } from "@/store/errorStore";

export const ErrorSnackbar = () => {
  const { message, severity, open } = useSnapshot(errorStore.state);

  const handleClose = () => {
    errorStore.actions.clear();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}; 