import { ipcMain } from 'electron';
import { ChatsController } from './../controllers/ChatsController';
import { ModelsController } from './../controllers/ModelsController';
import { MessagesController } from './../controllers/MessagesController';

export const startRouter = () => {
  console.log('Router started');
  // Chats API
  ipcMain.handle('chats:get', ChatsController.getChats);
  ipcMain.handle('chats:update', ChatsController.updateChat);
  ipcMain.handle('chats:create', ChatsController.createChat);
  ipcMain.handle('chats:delete', ChatsController.deleteChat);

  // Models API
  ipcMain.handle('models:get', ModelsController.getModels);
  ipcMain.handle('models:delete', ModelsController.deleteModel);

  // Messages API
  ipcMain.handle('messages:get', MessagesController.getMessages);
};