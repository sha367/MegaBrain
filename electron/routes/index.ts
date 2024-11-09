import { ipcMain } from 'electron';
import { ChatController } from './../controllers/ChatController';
import { ModelController } from './../controllers/ModelController';

export const startRouter = () => {
  // Chats API
  ipcMain.handle('chats:get', ChatController.getChats);
  ipcMain.handle('chat:get', ChatController.getChat);
  ipcMain.handle('chat:update', ChatController.updateChat);
  ipcMain.handle('chat:create', ChatController.createNewChat);
  ipcMain.handle('chat:delete', ChatController.deleteChat);

  // Models API
  ipcMain.handle('models:get', ModelController.getModels);
  ipcMain.handle('model:download', ModelController.downloadModel);
  ipcMain.handle('model:delete', ModelController.deleteModel);
};
