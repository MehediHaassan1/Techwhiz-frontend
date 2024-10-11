"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Coffee } from "lucide-react";
import { Skeleton } from "@nextui-org/skeleton";
import { Link } from "@nextui-org/link";

import { useGetPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import Loading from "@/src/components/Loading";

const MotionCard = motion(Card);

export default function BentoGridNews() {
  const paramsOptions = {
    category: "",
    search: "",
    isPopular: false,
    isRandom: true,
    page: 1,
    limit: 10,
  };
  const { data: randomPosts, isLoading: randomPostsLoading } =
    useGetPosts(paramsOptions);

  return (
    <>
      {randomPostsLoading && <Loading />}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Featured Post */}
          <MotionCard
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
            whileHover={{ scale: 1.02 }}
          >
            <CardBody className="p-0">
              <Image
                alt="Featured blog post"
                className="w-full object-cover object-center"
                height={256}
                src={randomPosts?.posts[0].thumbnail}
                style={{ maxHeight: "256px" }}
                width="100%"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">
                  <Link href={`/news-feed/${randomPosts?.posts[0]._id}`}>
                    {randomPosts?.posts[0].title}
                  </Link>
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  {randomPosts?.posts[0].description.length > 200
                    ? randomPosts?.posts[0].description.slice(0, 200)
                    : randomPosts?.posts[0].description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar
                      className="mr-2"
                      size="sm"
                      src="/placeholder.svg?height=40&width=40"
                    />
                    <span className="text-sm font-medium">
                      {randomPosts?.posts[0]?.author?.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button isIconOnly size="sm" variant="light">
                      <Heart size={16} />
                    </Button>
                    <Button isIconOnly size="sm" variant="light">
                      <MessageCircle size={16} />
                    </Button>
                    <Button isIconOnly size="sm" variant="light">
                      <Share2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </MotionCard>

          {randomPostsLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <MotionCard
                  key={index}
                  className=""
                  whileHover={{ scale: 1.05 }}
                >
                  <CardBody className="p-4">
                    <Card className="w-full space-y-5 p-4" radius="lg">
                      <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300" />
                      </Skeleton>
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                        </Skeleton>
                      </div>
                    </Card>
                  </CardBody>
                </MotionCard>
              ))
            : randomPosts?.posts?.slice(1, 5)?.map((post: IPost) => (
                <MotionCard
                  key={post?._id}
                  className=""
                  whileHover={{ scale: 1.05 }}
                >
                  <CardBody className="p-4">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold">
                        <Link href={`/news-feed/${post._id}`}>
                          {post?.title}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {post?.description.length > 200
                        ? post?.description.slice(0, 200) + "..."
                        : post?.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Coffee className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-xs">5 min read</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button isIconOnly size="sm" variant="light">
                          <Heart size={16} />
                        </Button>
                        <span className="text-xs">{post.upVotes?.length}</span>
                        <Button isIconOnly size="sm" variant="light">
                          <MessageCircle size={16} />
                        </Button>
                        <span className="text-xs">
                          {post?.comments?.length}
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </MotionCard>
              ))}

          {/* About Our Blog */}
          <MotionCard
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-r from-pink-400 to-pink-600 text-white"
            whileHover={{ scale: 1.02 }}
          >
            <CardBody className="flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-xl font-bold mb-2">About Our Blog</h3>
              <p className="text-sm mb-4">
                We are passionate about sharing knowledge and inspiring
                creativity in the world of design and technology.
              </p>
              <Button color="primary" variant="solid">
                Subscribe
              </Button>
            </CardBody>
          </MotionCard>
        </div>
      </div>
    </>
  );
}
