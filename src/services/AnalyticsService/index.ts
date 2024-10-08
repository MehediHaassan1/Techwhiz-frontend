"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getAnalytics = async () => {
  try {
    const { data } = await axiosInstance.get("/analytics");

    if (data?.success) {
      return data;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
