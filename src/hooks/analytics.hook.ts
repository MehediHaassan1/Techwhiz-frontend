import { useQuery } from "@tanstack/react-query";

import { getAnalytics, getUserAnalytics } from "../services/AnalyticsService";

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: async () => await getAnalytics(),
    staleTime: 300000,
    refetchInterval: 30000,
  });
};

export const useGetUserAnalytics = () => {
  return useQuery({
    queryKey: ["user-analytics"],
    queryFn: async () => await getUserAnalytics(),
    staleTime: 300000,
    refetchInterval: 30000,
  });
};
