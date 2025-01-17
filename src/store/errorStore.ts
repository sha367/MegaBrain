import { proxy } from "valtio";

interface ErrorState {
  message: string | null;
  severity: "error" | "warning" | "info" | "success";
  open: boolean;
}

const state = proxy<ErrorState>({
  message: null,
  severity: "error",
  open: false,
});

export const errorActions = {
  showError: (message: string) => {
    state.message = message;
    state.severity = "error";
    state.open = true;
  },

  showWarning: (message: string) => {
    state.message = message;
    state.severity = "warning";
    state.open = true;
  },

  showInfo: (message: string) => {
    state.message = message;
    state.severity = "info";
    state.open = true;
  },

  showSuccess: (message: string) => {
    state.message = message;
    state.severity = "success";
    state.open = true;
  },

  clear: () => {
    state.message = null;
    state.open = false;
  },
};

export const errorStore = {
  state,
  actions: errorActions,
}; 