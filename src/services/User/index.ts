"use server"

import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getAllUsersFromDB = async () => {
  try {
    const { data } = await axiosInstance.get(`/users`)
    if (data?.success) {
      return data;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message;
    throw new Error(errorMessage);
  }
}

export const toggleFollow = async (followingId: string) => {
  try {
    const { data } = await axiosInstance.put(`/users/${followingId}/follow-toggle`)
    if (data.success) {
      revalidateTag('post');
      return null;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message;
    throw new Error(errorMessage);
  }
}

export const toggleStatus = async (userId: string, action: 'block' | 'unblock') => {
  try {
    const { data } = await axiosInstance.patch(
      `/users/${userId}/status`,
      null,
      { params: { action } }
    )
    if (data.success) {
      return null;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message;
    throw new Error(errorMessage);
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/users/${userId}`)
    if (data.success) {
      return null;
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message;
    throw new Error(errorMessage);
  }
}