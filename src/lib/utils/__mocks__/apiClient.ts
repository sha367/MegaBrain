import { TEST_ENV } from "../../../../tests/testEnv";

export const BASE_URL = `${TEST_ENV.VITE_SERVER_URL}:${TEST_ENV.VITE_SERVER_DEFAULT_PORT}`;

// Add other exports that match your actual apiClient.ts 