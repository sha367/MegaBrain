import axios, { AxiosResponse } from 'axios';

const host = import.meta.env.VITE_SERVER_URL;
const port = import.meta.env.VITE_SERVER_DEFAULT_PORT;
const baseURL = `${host}:${port}`;

console.log('import.meta.env', import.meta.env);
console.log('baseURL:basePort', baseURL);

/** Common axios client with the base url */
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Check axios' response */
export const isStatusOk = (response: AxiosResponse) => {
  return (response.status >= 200 && response.status < 300)
}
