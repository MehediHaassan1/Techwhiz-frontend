"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

export const getPosts = async () => {
  const res = await fetch(`${envConfig.baseApi}/posts`)

  return res.json();
}


export const getPost = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
    next: {
      tags: ['post'],
    }
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${id}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const createComment = async (
  id: string,
  commentData: { user: string, content: string }
) => {

  try {
    const { data } = await axiosInstance.post(`/posts/post-comment/${id}`, commentData);
    revalidateTag('post')

    return data;
  } catch (error: any) {
    throw new Error(error)
  }
}

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/delete-comment/${postId}/${commentId}`)
    if (data?.success) {
      revalidateTag('post')
      return null;
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export const editComment = async (
  postId: string,
  commentId: string,
  newComment: { content: string }
) => {
  try {
    const { data } = await axiosInstance.put(`/posts/update-comment/${postId}/${commentId}`, newComment)
    if (data?.success) {
      revalidateTag('post')
      return null;
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export const votePost = async (postId: string, action: string) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}/vote`, { action })
    if (data?.success) {
      revalidateTag('post')
      return null;
    }
  } catch (error: any) {
    throw new Error(error)
  }
}