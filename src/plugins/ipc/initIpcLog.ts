/**
 * Log messages from the main process
 */
export const initIpcLog = () => {
  if (!window.ipcRenderer) {
    console.error();
    return;
  }

  console.log('initIpcLog');

  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message);
  });
  window.ipcRenderer.on('main-process-error', (_event, message) => {
    console.error(message);
  });
  window.ipcRenderer.on('main-process-warn', (_event, message) => {
    console.warn(message);
  });
};
