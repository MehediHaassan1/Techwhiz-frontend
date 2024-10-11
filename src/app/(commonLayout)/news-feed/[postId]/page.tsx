"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import Loading from "@/src/components/Loading";
import { useGetPost, useGetPosts } from "@/src/hooks/post.hook";
import { IPost, IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";

import PostData from "./PostData";
import Author from "./Author";

interface IProps {
  params: {
    postId: string;
  };
}

export default function PostDetails({ params: { postId } }: IProps) {
  const normalPostsParams = {
    category: "",
    search: "",
    isPopular: false,
    isRandom: false,
    page: 1,
    limit: 10,
  };
  const { data: posts } = useGetPosts(normalPostsParams);
  const { data, isLoading } = useGetPost(postId);
  const { user } = useUser();
  const router = useRouter();

  const authorPosts = posts?.data
    ?.filter((post: IPost) => post?.author?._id === data?.data?.author?._id)
    ?.slice(0, 2);

  const isPremiumAndNotVerified = data?.data?.isPremium && !user?.isVerified;

  return (
    <>
      {isLoading && <Loading />}
      <div className="max-w-3xl mx-auto p-4">
        {isPremiumAndNotVerified && (
          <div className="bg-black/80 h-screen fixed inset-0 z-[999] backdrop-blur-md flex items-center justify-center">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-8 max-w-sm text-center">
              <h2 className="text-4xl font-extrabold text-white mb-4">
                Premium Content
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                This content is exclusive to premium users. Please upgrade to
                access it.
              </p>
              <div className="flex items-center gap-3 justify-center">
                <Button
                  className="rounded font-semibold shadow-md "
                  color="success"
                  variant="bordered"
                  onClick={() => router.push("/choose-plan")}
                >
                  Upgrade Now
                </Button>
                <Button
                  className="bg-gray-600 text-white hover:bg-gray-700 transition duration-300 rounded font-semibold"
                  onClick={() => router.back()}
                >
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        )}
        <PostData post={data?.data} user={user as IUser} />
        <Author author={data?.data?.author} authorPosts={authorPosts} />
      </div>
    </>
  );
}
