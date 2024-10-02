"use client";

import { useGetMyPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { User } from "@nextui-org/user";
import {
    MessageCircleIcon,
    BookOpenIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function MyPosts() {
    const { data } = useGetMyPosts();
    const posts = data?.data;

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Blog Posts */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Latest Blog Posts</h2>
                {posts?.map((post: IPost) => (
                    <Card key={post?._id} className="w-full">
                        <CardHeader className="flex gap-3">
                            <User
                                name={post?.author?.name}
                                description={`Posted on ${moment(
                                    post?.createdAt
                                ).fromNow()}`}
                                avatarProps={{
                                    src: `${post?.author?.profileImage}`,
                                }}
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="flex flex-col md:flex-row gap-4">
                                <Image
                                    src={post?.images[0]}
                                    alt={post?.title}
                                    className="w-full md:w-1/3 h-48 object-cover rounded-lg"
                                    width="100"
                                    height="100"
                                />
                                <div className="w-full md:w-2/3">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {post?.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {post?.content}
                                    </p>
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-4">
                                            <p className="flex items-center gap-2">
                                                <ThumbsUpIcon size={18} />
                                                {post?.upVotes}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <ThumbsDownIcon size={18} />
                                                {post?.downVotes}
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <MessageCircleIcon size={18} />
                                                {post?.comments?.length}
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/news-feed/${post._id}`}
                                        passHref
                                        className="flex items-center gap-2 hover:underline transition-all duration-300"
                                    >
                                        <BookOpenIcon size={18} />
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
