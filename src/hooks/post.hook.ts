import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createComment,
  createPost,
  deleteComment,
  deletePost,
  editComment,
  getMyPosts,
  getPost,
  getPosts,
  updatePost,
  votePost,
} from "../services/PostService";
import { ICreatePost, IUpdatePost } from "../types";

export const useCreatePost = () => {
  return useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (postData: ICreatePost) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetPost = (postId: string) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: async () => await getPost(postId),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
  });
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["post-comment"],
    mutationFn: async ({ id, comment }) => await createComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: () => {
      toast.error("Failed to post comment!");
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-comment"],
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => await deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: () => {
      toast.error("Failed to delete comment!");
    },
  });
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-comment"],
    mutationFn: async ({
      postId,
      commentId,
      comment,
    }: {
      postId: string;
      commentId: string;
      comment: { content: string };
    }) => await editComment(postId, commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: () => {
      toast.error("Failed to edit comment!");
    },
  });
};

export const useVotePost = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { postId: string; action: string }>({
    mutationKey: ["vote-post"],
    mutationFn: async ({ postId, action }) => await votePost(postId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post"] });
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};

export const useGetMyPosts = () => {
  return useQuery({
    queryKey: ["my-posts"],
    queryFn: async () => await getMyPosts(),
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-post"],
    mutationFn: async (postId: string) => await deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      toast.success("Post deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-post"],
    mutationFn: async ({
      id,
      postData,
    }: {
      id: string;
      postData: IUpdatePost;
    }) => await updatePost(id, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
      toast.success("Post updated successfully!");
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });
};
