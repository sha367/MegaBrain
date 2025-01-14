export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  automock: false,
  resetMocks: false,
  setupFiles: ["<rootDir>/tests/setup.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
}; 