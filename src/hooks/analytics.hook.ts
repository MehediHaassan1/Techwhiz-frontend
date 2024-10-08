import { useQuery } from "@tanstack/react-query";

import { getAnalytics, getUserAnalytics } from "../services/AnalyticsService";

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getAnalytics(),
  });
};

export const useGetUserAnalytics = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserAnalytics(),
  });
};
