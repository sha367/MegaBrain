import axios from "axios";

export const llmClient = axios.create({
  baseURL: 'http://127.0.0.1:11434',
  headers: {
    'Content-Type': 'application/json',
  },
});
