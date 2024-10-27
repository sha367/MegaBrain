<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const loading = ref(false);
const message = ref('');
const responseText = ref('');

async function sendMessageToLLM(message: string) {
  try {
    loading.value = true;
    const response = await axios.post('http://127.0.0.1:11434/api/generate', 
    { prompt: message, model: 'defaultModel:latest', stream: false },
    { headers: { 'Content-Type': 'application/json' } }
    );
    console.log('Response from LLM:', response);

    responseText.value = response.data.response;
  } catch (err) {
    console.error('Failed to send message to LLM:', err);
  }
  finally {
    loading.value = false;
  }
}

async function getListOfModels() {
  try {
    const response = await axios.get('http://127.0.0.1:11434/api/tags');
    console.log('Response from LLM:', response);
  } catch (err) {
    console.error('Failed to get list of models from LLM:', err);
  }
}

function onSend() {
  if (message.value) {
    sendMessageToLLM(message.value);
  }
}
</script>

<template>
  <h1>MyGPX</h1>

  <div v-if='loading'>
    <span>Loading...</span>
  </div>

  <div v-else>
    <textarea v-model='message' rows="4" cols="50" />
    <br>
    <button :disabled='!message' @click.prevent='onSend'>Send</button>
  
    <br>
  
    <span>{{ responseText }}</span>
  
    <br>
  
    <button @click.prevent='getListOfModels'>list</button>
    <!-- <button @click.prevent='getListOfModels'>ps</button> -->
  </div>
</template>

<style scoped>

</style>
