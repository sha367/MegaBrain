import 'uno.css';
import '@/styles/index.scss';

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/App.tsx'
import { initIpcLogger } from './lib/utils/ipcLogger.ts'
console.log("main.tsx");
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

