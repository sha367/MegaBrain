/**
 * TODO: combine with ipcLog
 * Listen to messages from main process
 */
export const initIpcHandler = () => {
  if (!window.ipcRenderer) {
    console.error('no ipcRenderer');
    return;
  }

  console.log('initIpcLog');

  window.ipcRenderer.on('main-process-loading-status', (_event, message) => {
    window.mainProcessLoadingStatus = message;
  });
};
