"use server"

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const toggleFollow = async (followingId: string) => {
  try {
    const { data } = await axiosInstance.put(`/users/${followingId}/follow-toggle`)
    if (data.success) {
      revalidateTag('post');
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message); 
  }
}