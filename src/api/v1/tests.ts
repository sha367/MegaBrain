import { apiClient } from "@/lib/utils/apiClient";

/** Test request */
export const TEST_REQUEST = async () => {
  return apiClient.get<string>('/api/test');
};
