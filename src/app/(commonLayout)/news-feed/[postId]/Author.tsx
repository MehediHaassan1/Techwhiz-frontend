"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { IPost, IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { useToggleFollow } from "@/src/hooks/user.hook";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export default function Author({
    author,
    authorPosts,
}: {
    author: IUser;
    authorPosts: IPost[];
}) {
    const { user } = useUser();
    const { mutate: toggleFollow } = useToggleFollow();

    const handleToggleFollow = () => {
        toggleFollow(author._id);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <div className="flex items-start space-x-4 mb-6">
                <div>
                    {author?.isVerified ? (
                        <Badge
                            isOneChar
                            content={<CheckIcon />}
                            color="success"
                            placement="bottom-right"
                            shape="circle"
                        >
                            <Avatar
                                isBordered
                                radius="full"
                                src={user?.profileImage}
                                className="border-4 border-white z-10"
                            />
                        </Badge>
                    ) : (
                        <Badge
                            isOneChar
                            content={<CheckIcon />}
                            color="default"
                            placement="bottom-right"
                            shape="circle"
                        >
                            <Avatar
                                isBordered
                                radius="full"
                                src={user?.profileImage}
                                className="border-4 border-white z-10"
                            />
                        </Badge>
                    )}
                </div>
                <div className="flex-grow">
                    <h1 className="text-2xl font-bold flex items-center">
                        Written by {author?.name}{" "}
                        <span className="ml-2">😉</span>
                    </h1>
                    <p className="text-muted-foreground">
                        {author?.followers?.length} Followers
                    </p>
                    <p className="mt-2">{author?.bio}</p>
                </div>
                <div className="flex flex-col space-y-2">
                    {!user ? (
                        <Button
                            as={Link}
                            passHref
                            href="/login"
                            className="rounded"
                        >
                            Follow
                        </Button>
                    ) : author?._id === user?._id ? (
                        <div></div>
                    ) : author?.followers?.includes(user?._id) ? (
                        <Button
                            onClick={handleToggleFollow}
                            className="rounded"
                        >
                            Unfollow
                        </Button>
                    ) : (
                        <Button
                            onClick={handleToggleFollow}
                            className="rounded"
                        >
                            Follow
                        </Button>
                    )}
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">
                More from {author?.name} 😉
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
                {authorPosts?.map((post) => (
                    <Card as={Link} href={`/news-feed/${post?._id}`}>
                        <CardHeader>
                            <h1 className="text-lg">{post?.title}</h1>
                        </CardHeader>
                        <CardBody>
                            <Image
                                src={post?.images[0]}
                                alt={post?.title}
                                className="w-full h-40 object-cover rounded-md"
                                width="100"
                                height="100"
                            />
                            <div className="absolute bottom-4 flex items-center mt-2 gap-2">
                                <Avatar
                                    src={author?.profileImage}
                                    alt={author?.name}
                                    fallback
                                />
                                <p className="text-sm">{author?.name} 😉</p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}
