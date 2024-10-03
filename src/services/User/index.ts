"use server"

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getAllUsers = async () => {
  const fetchOptions = {
    next: {
      tags: ["users"]
    }
  }
  const res = await fetch(`${envConfig.baseApi}/users`, fetchOptions)
  return res.json();
}

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