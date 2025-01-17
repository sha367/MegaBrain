/**
 * Interface for model specifications
 */
interface IModelSpec {
  /** Base model name */
  name: string;
  /** Model parameters/size */
  parameters: string;
  /** Full model identifier (computed) */
  fullName: string;
}

/**
 * List of top performing chat models
 * Sorted by parameter size and performance metrics
 */
export const TOP_CHAT_MODELS: readonly IModelSpec[] = [
  { 
    name: "llama3.1",
    parameters: "405b",
    fullName: "llama3.1:405b"
  },
  { 
    name: "command-r-plus",
    parameters: "104b",
    fullName: "command-r-plus:104b"
  },
  { 
    name: "qwen",
    parameters: "110b",
    fullName: "qwen:110b"
  },
  { 
    name: "deepseek-coder-v2",
    parameters: "236b",
    fullName: "deepseek-coder-v2:236b"
  },
  { 
    name: "wizardlm2",
    parameters: "8x22b",
    fullName: "wizardlm2:8x22b"
  },
  { 
    name: "qwen2.5",
    parameters: "72b",
    fullName: "qwen2.5:72b"
  },
  { 
    name: "llama3.2-vision",
    parameters: "90b",
    fullName: "llama3.2-vision:90b"
  },
  { 
    name: "gemma2",
    parameters: "27b",
    fullName: "gemma2:27b"
  },
  { 
    name: "mistral-large",
    parameters: "123b",
    fullName: "mistral-large:123b"
  },
  { 
    name: "deepseek-llm",
    parameters: "67b",
    fullName: "deepseek-llm:67b"
  }
] as const;

/**
 * Type for top chat models
 */
export type TopChatModel = typeof TOP_CHAT_MODELS[number];

/**
 * Get the full model name (name:parameters)
 */
export const getFullModelName = (name: string, parameters: string): string => 
  `${name}:${parameters}`;

/**
 * Check if a model is in the top models list
 */
export const isTopModel = (modelName: string): boolean => 
  TOP_CHAT_MODELS.some(model => model.fullName === modelName);

/**
 * Get model details if it's a top model
 */
export const getTopModelDetails = (modelName: string): TopChatModel | undefined => 
  TOP_CHAT_MODELS.find(model => model.fullName === modelName); 