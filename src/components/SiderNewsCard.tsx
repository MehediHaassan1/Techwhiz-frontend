import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Link } from "@nextui-org/link";
import {
    BookmarkIcon,
    MessageCircleIcon,
    ThumbsDownIcon,
    ThumbsUpIcon,
} from "lucide-react";
import Image from "next/image";
import { IPost } from "../types";

const SiderNewsCard = ({ post }: { post: IPost }) => {
    return (
        <Card className="max-w-xl mx-auto w-full">
            <CardBody className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <Image
                        alt={post?.title}
                        className="rounded-lg object-cover w-full md:w-1/3 h-24 md:h-auto"
                        height="200"
                        src={post.images[0]}
                        style={{
                            aspectRatio: "300/200",
                            objectFit: "cover",
                        }}
                        width="300"
                    />
                    <div className="flex-1 space-y-2">
                        <Link
                            href={`/news-feed/${1}`}
                            className="text-md font-bold leading-tight"
                        >
                            {post?.title}
                        </Link>
                        <div className="flex items-center space-x-5">
                            <div className="flex items-center text-sm">
                                <ThumbsUpIcon className={`size-4 mr-1`} />
                                {post?.upVotes}
                            </div>
                            <div className="flex items-center text-sm">
                                <ThumbsDownIcon className={`size-4 mr-1`} />
                                {post?.downVotes}
                            </div>
                            <div className="flex items-center text-sm">
                                <MessageCircleIcon className="size-4 mr-1" />
                                {post?.comments.length}
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default SiderNewsCard;
