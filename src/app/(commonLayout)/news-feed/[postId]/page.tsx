"use client";

import Author from "./Author";
import PostData from "./PostData";

import Loading from "@/src/components/Loading";
import { useGetPost, useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

interface IProps {
  params: {
    postId: string;
  };
}

export default function PostDetails({ params: { postId } }: IProps) {
  const { data: posts } = useGetPosts();
  const { data, isLoading } = useGetPost(postId);

  const authorPosts = posts?.data
    ?.filter((post: IPost) => post?.author?._id === data?.author?._id)
    ?.slice(0, 2);

  return (
    <>
      {isLoading && <Loading />}
      <div className="max-w-3xl mx-auto p-4">
        <PostData post={data?.data} />
        <Author author={data?.data?.author} authorPosts={authorPosts} />
      </div>
    </>
  );
}
