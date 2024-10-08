"use client";

import SiderNewsCard from "@/src/components/SiderNewsCard";
import { IPost } from "@/src/types";
import { useGetPosts } from "@/src/hooks/post.hook";
import Loading from "@/src/components/Loading";
import NewsCard from "@/src/components/NewsCard";

import BecomeAPremiumMember from "./Ad";

const NewsFeedPage = () => {
  const { data, isLoading } = useGetPosts();

  const posts = data?.data as IPost[];

  const popularPosts = posts?.filter((post) => post.upVotes.length > 5);

  return (
    <>
      {isLoading && <Loading />}
      <div className="container mx-auto">
        <BecomeAPremiumMember />
        <div className="grid md:grid-cols-3">
          <div className="md:col-span-2 space-y-5 p-4">
            {posts?.map((post: IPost) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
          <div className="md:col-span-1 p-4 space-y-5 ">
            <div className="h-fit sticky top-16 ">
              <h1>Popular Posts</h1>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
                {popularPosts?.map((post: IPost) => (
                  <SiderNewsCard key={post?._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-8">
                    Whats New
                </h1>
                <div className="flex">
                    <div className="w-full grid grid-cols-1  lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-3 space-y-8 border-r">
                            {randomPosts.slice(4).map((post: IPost) => (
                                <div
                                    key={post?._id}
                                    className="flex flex-col cursor-pointer md:flex-row overflow-hidden border-b border-gray-300 pb-4 last:border-b-0"
                                >
                                    <div className="relative overflow-hidden group">
                                        <div className="transition-transform duration-300 group-hover:scale-110">
                                            <Image
                                                alt={
                                                    post?.title || "Post Image"
                                                }
                                                className="w-96 h-40 object-cover"
                                                height={140}
                                                src={post?.images[0]}
                                                width={384}
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <span className="bg-pink-500 text-white text-xs font-semibold px-2 py-1 uppercase">
                                            {post?.category || "Category"}
                                        </span>
                                        <Link
                                            className="text-xl block hover:text-pink-500 md:text-2xl font-bold mb-2 cursor-pointer hover:underline transition duration-300 ease-in-out"
                                            href={`/news-feed/${post?._id}`}
                                        >
                                            {post.title || "Post Title"}
                                        </Link>
                                        <div className="flex items-center text-sm">
                                            <span>
                                                By{" "}
                                                {post?.author?.name || "Author"}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <CalendarIcon className="w-4 h-4 mr-1" />
                                            <span>
                                                {new Date(
                                                    post?.createdAt
                                                ).toLocaleDateString() ||
                                                    "Date"}
                                            </span>
                                            <span className="mx-2">•</span>
                                            <Link
                                                className="flex items-center justify-center hover:text-pink-500 transition-colors"
                                                href={`/news-feed/${post._id}#comment`}
                                            >
                                                <MessageCircle className="w-4 h-4 mr-1 cursor-pointer" />
                                                <span>
                                                    {post?.comments?.length ||
                                                        "No"}{" "}
                                                    Comments
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="space-y-8">
                            
                            <div className="bg-blue-900 text-white p-6">
                                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                                    Unlock Exclusive Benefits as a Premium
                                    Member
                                </h3>
                                <p className="mb-4">
                                    Join our premium membership to gain access
                                    to special offers, personalized content, and
                                    advanced features designed to elevate your
                                    experience.
                                </p>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-full mt-4">
                                    UPGRADE NOW
                                </button>
                            </div>
                        </div>
                        <div className="space-y-8">
                            
                            <div className="cursor-pointer">
                                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                                    Categories
                                </h3>
                                <hr className="border-gray-300 mb-4" />

                                <div className="grid grid-cols-3 gap-4">
                                    {categories.map((category, index) => {
                                        const categoryImage =
                                            categoryImageMapping[category] ||
                                            "";

                                        console.log(category, categoryImage);

                                        return (
                                            <div
                                                key={index}
                                                className="relative overflow-hidden group w-36 h-36 gap-2"
                                            >
                                                <div className="transition-transform duration-300 group-hover:scale-110 h-full w-full">
                                                    <Image
                                                        alt={category}
                                                        className="object-cover h-full w-full"
                                                        height={144}
                                                        src={categoryImage}
                                                        width={144}
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                        <span className="text-white font-semibold">
                                                            {category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      </div>
    </>
  );
};

export default NewsFeedPage;

// const categoryImageMapping: Record<string, string> = {
//   Mobile: "https://i.ibb.co/JtjMps6/mobile.webp",
//   Macbook: "https://i.ibb.co/SKWQS6T/macbook.jpg",
//   Gaming: "https://i.ibb.co/QbD56cY/gamingcontrol.jpg",
//   Tech: "https://i.ibb.co/NV5f5Td/tech.webp",
//   Watch: "https://i.ibb.co/16wN032/watch.jpg",
// };
