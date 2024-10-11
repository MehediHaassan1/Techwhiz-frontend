"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Badge } from "@nextui-org/badge";
import { CheckIcon } from "lucide-react";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import { Tooltip } from "@nextui-org/react";

import { useToggleFollow } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";
import { IPost, IUser } from "@/src/types";

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
              color="success"
              content={<CheckIcon />}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                isBordered
                className="border-4 border-white z-10"
                radius="full"
                src={author?.profileImage}
              />
            </Badge>
          ) : (
            <Badge
              isOneChar
              color="default"
              content={<CheckIcon />}
              placement="bottom-right"
              shape="circle"
            >
              <Avatar
                isBordered
                className="border-4 border-white z-10"
                radius="full"
                src={author?.profileImage}
              />
            </Badge>
          )}
        </div>
        <div className="flex-grow">
          <h1 className="text-2xl font-bold flex items-center">
            Written by {author?.name} <span className="ml-2">😉</span>
          </h1>
          <p className="text-muted-foreground">
            {author?.followers?.length} Followers
          </p>
          <p className="mt-2">{author?.bio}</p>
        </div>
        <div className="flex flex-col space-y-2">
          {!user ? (
            <Button passHref as={Link} className="rounded" href={`/login`}>
              Follow
            </Button>
          ) : author?._id === user?._id ? (
            <div />
          ) : author?.followers?.includes(user?._id) ? (
            <Button className="rounded" onClick={handleToggleFollow}>
              Unfollow
            </Button>
          ) : (
            <Button className="rounded" onClick={handleToggleFollow}>
              Follow
            </Button>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">More from {author?.name} 😉</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {authorPosts?.map((post) => (
          <Card key={post?._id} as={Link} href={`/news-feed/${post?._id}`}>
            <CardHeader>
              <Tooltip content={post?.title}>
                <h1 className="text-lg">
                  {post?.title.length > 20
                    ? post?.title.slice(0, 40) + "..."
                    : post?.title}
                </h1>
              </Tooltip>
            </CardHeader>
            <CardBody>
              <Image
                alt={post?.title}
                className="w-full h-40 object-cover rounded-md"
                height="100"
                src={post?.thumbnail}
                width="100"
              />
              <div className="absolute bottom-4 flex items-center mt-2 gap-2">
                <Avatar
                  fallback
                  alt={author?.name}
                  src={author?.profileImage}
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
