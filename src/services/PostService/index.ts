"use server";

import { revalidateTag } from "next/cache";

import axiosInstance from "@/src/lib/AxiosInstance";
import { ICreatePost, IUpdatePost } from "@/src/types";

export const createPost = async (postData: ICreatePost) => {
  try {
    const { data } = await axiosInstance.post("/posts", postData);

    if (data?.success) {
      revalidateTag("posts");

      return data;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getPosts = async (category = "", search = "") => {
  try {
    const { data } = await axiosInstance.get("/posts", {
      params: {
        category,
        search,
      },
    });

    if (data?.success) {
      return { ...data, tags: ["posts"] };
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error fetching posts");
  }
};

export const getPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${id}`);

    if (data?.success) {
      return { ...data, tags: ["post"] };
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Error fetching post");
  }
};

export const createComment = async (
  id: string,
  commentData: { user: string; content: string },
) => {
  try {
    const { data } = await axiosInstance.post(
      `/posts/post-comment/${id}`,
      commentData,
    );

    revalidateTag("post");
    revalidateTag("posts");

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteComment = async (postId: string, commentId: string) => {
  try {
    const { data } = await axiosInstance.delete(
      `/posts/delete-comment/${postId}/${commentId}`,
    );

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const editComment = async (
  postId: string,
  commentId: string,
  newComment: { content: string },
) => {
  try {
    const { data } = await axiosInstance.put(
      `/posts/update-comment/${postId}/${commentId}`,
      newComment,
    );

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const votePost = async (postId: string, action: string) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}/vote`, {
      action,
    });

    if (data?.success) {
      revalidateTag("post");

      return null;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const getMyPosts = async () => {
  try {
    const { data } = await axiosInstance.get("/posts/my-posts");

    if (data?.success) {
      return data;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const deletePost = async (postId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}`);

    if (data?.success) {
      return data;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};

export const updatePost = async (postId: string, postData: IUpdatePost) => {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}`, postData);

    if (data?.success) {
      return data;
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
