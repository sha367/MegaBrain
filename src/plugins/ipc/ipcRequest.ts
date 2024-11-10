export const ipcRequest = async (channel: string, ...args: unknown[]) => {
  if (!window.ipcRenderer) {
    console.error('ipcRenderer is not defined');
    return;
  }

  return window.ipcRenderer.invoke(channel, ...args);
};
