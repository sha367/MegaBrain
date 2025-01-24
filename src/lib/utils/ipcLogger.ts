export const initIpcLogger = () => {
  if (!window.ipcRenderer) {
    return
  }

  // window.ipcRenderer.on('main-process-message', (_, message) => {
  //   console.log('Message from main process:', message);
  // });

  // window.ipcRenderer.on('main-process-log', (_, ...messages) => {
  //   console.log(...messages);
  // });

  // window.ipcRenderer.on('main-process-error', (_, ...messages) => {
  //   console.error(...messages);
  // });

  // window.ipcRenderer.on('main-process-warn', (_, ...messages) => {
  //   console.warn(...messages);
  // });
};
