import {
  BookmarkIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageCircleIcon,
} from "lucide-react";
import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import Image from "next/image";
import { Link } from "@nextui-org/link";
import moment from "moment";

import { IPost } from "../types";

export default function NewsCard({ post }: { post: IPost }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <Avatar
            showFallback
            className="w-12 h-12 text-3xl"
            name={post?.author.name.split("")[0]}
            src={post?.author?.profileImage}
          />

          <div className="flex flex-col">
            <p className="text-lg font-semibold">{post?.author?.name}</p>
            <p className="text-sm text-gray-500">
              {moment(post?.createdAt).format("llll")} · 5 min read
            </p>
          </div>
        </div>
        <div>
          <p className="mr-5 hover:cursor-pointer">
            <BookmarkIcon className="w-5 h-5 bg-transparent" />
          </p>
        </div>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <Link className="hover:underline" href={`/news-feed/${post?._id}`}>
              <h1 className="text-2xl font-bold leading-tight">
                {post?.title}
              </h1>
            </Link>
            <p>
              {post?.description?.length > 200
                ? post?.description.slice(0, 200)
                : post?.description}
              ...
            </p>
          </div>
          <Image
            alt="Article thumbnail"
            className="rounded-lg object-cover w-full md:w-1/3 h-48 md:h-auto"
            height="200"
            src={post?.thumbnail}
            style={{
              aspectRatio: "300/200",
              objectFit: "cover",
            }}
            width="300"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {post?.tags.map((tag: string) => (
              <Chip key={tag} variant="solid">
                {tag}
              </Chip>
            ))}
          </div>
          <div>
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <ThumbsUpIcon className={`w-5 h-5 mr-2`} />
                {post?.upVotes?.length}
              </div>
              <div className="flex items-center">
                <ThumbsDownIcon className={`w-5 h-5 mr-2`} />
                {post?.downVotes?.length}
              </div>
              <div className="flex items-center">
                <MessageCircleIcon className="w-5 h-5 mr-2" />
                {post?.comments.length}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
