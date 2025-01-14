import { TEST_ENV } from "./testEnv";

// Mock import.meta.env globally before any tests run
global.import = {
  meta: {
    env: TEST_ENV,
  },
} as any;

// Also set process.env for compatibility
process.env = {
  ...process.env,
  ...TEST_ENV,
}; 