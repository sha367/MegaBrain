import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })

  window.ipcRenderer.on('main-process-error', (_event, message) => {
    console.error(message)
  })

  window.ipcRenderer.on('main-process-warn', (_event, message) => {
    console.warn(message)
  })
})
