import axios, { AxiosResponse } from 'axios';

const host = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_DEFAULT_PORT;
export const BASE_URL = `${host}:${port}`;

console.log('import.meta.env', import.meta.env);
console.log('baseURL:basePort', BASE_URL);

/** Common axios client with the base url */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Check axios' response */
export const isStatusOk = (response: AxiosResponse) => {
  return (response.status >= 200 && response.status < 300)
}
