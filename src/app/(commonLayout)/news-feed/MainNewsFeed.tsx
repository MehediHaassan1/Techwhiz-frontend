"use client";

import Loading from "@/src/components/Loading";
import NewsCard from "@/src/components/NewsCard";
import SiderNewsCard from "@/src/components/SiderNewsCard";
import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

const MainNewsFeed = () => {
  const { data, isLoading } = useGetPosts();

  const posts = data?.data as IPost[];

  const mostLikedBlog = posts?.sort(
    (a, b) => b?.upVotes?.length - a?.upVotes?.length,
  );

  return (
    <div>
      {isLoading && <Loading />}
      <div className="grid md:grid-cols-3">
        <div className="md:col-span-2 space-y-5 p-4">
          {posts?.map((post: IPost) => <NewsCard key={post._id} post={post} />)}
        </div>
        <div className="md:col-span-1 p-4 space-y-5 ">
          <div className="h-fit sticky top-16 ">
            <h1>Popular Posts</h1>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
              {mostLikedBlog
                ?.slice(0, 6)
                ?.map((post: IPost) => (
                  <SiderNewsCard key={post?._id} post={post} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNewsFeed;
