import { Express } from 'express';
import { ChatsController } from '../controllers/ChatsController';
import { MessagesController } from '../controllers/MessagesController';
import { ModelsController } from '../controllers/ModelsControllers';
import { TestController } from '../controllers/TestController';

export const startRouter = (app: Express) => {
  // TEST
  app.get('/api/test', TestController.test);

  // MESSAGES
  app.get('/api/messages', MessagesController.getMessages);
  app.post('/api/message', MessagesController.postMessage);

  // CHATS
  app.get('/api/chats', ChatsController.getChats);
  app.post('/api/chat', ChatsController.createChat);
  // app.get('/api/chat/:id', ChatsController.readChat);
  // app.put('/api/chat/:id', ChatsController.updateChat);
  app.delete('/api/chat', ChatsController.deleteChat);

  // MODELS
  app.get('/api/models', ModelsController.getModels);
  app.get('/api/models/recommended', ModelsController.getRecommendedModels);
  app.post('/api/model/pull', ModelsController.pullModel);
};
