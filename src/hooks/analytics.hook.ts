import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "../services/AnalyticsService";

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getAnalytics(),
  });
};
