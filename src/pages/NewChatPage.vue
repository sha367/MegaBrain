<script lang='ts' setup>
import { chatApi } from '@/api/chatApi';
import { modelApi } from '@/api/modelApi';
import ChatStartNew from '@/components/chat/ChatStartNew.vue';
import ChatTemplate from '@/components/chat/ChatTemplate.vue';
import { TModel } from '@/components/models/models.types';
import { checkResponse } from '@/utils/checkResponse';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const models = ref<TModel[]>([]);
const selectedModel = ref<TModel | null>(null);

const sendMessage = async (content: string) => {
  try {
    if (!selectedModel.value) {
      throw new Error('No model selected');
    }

    const res = await chatApi.createNewChat({ modelId: selectedModel.value.id, message: content });
    console.log('sendMessageRequest', res);

    checkResponse(res);

    router.push({ name: 'ChatPage', params: { id: res.data.id } });
  } catch (err) {
    console.log(err);
  }
};

/** Load all models */
const loadModels = async () => {
  try {
    const res = await modelApi.getModels();
    console.log('loadModels', res);

    checkResponse(res);

    models.value = res.data;

    if (!selectedModel.value && models.value.length > 0) {
      selectedModel.value = models.value[0];
    }
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  loadModels();
});
</script>

<template>
  <ChatTemplate @send-message='sendMessage'>
    <ChatStartNew
      :models='models'
      :selected-model='selectedModel'
      @select-model='(model) => selectedModel = model'
    />
  </ChatTemplate>
</template>
