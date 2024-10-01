"use client";

import { useState } from "react";
import {
    CalendarIcon,
    MessageSquare,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import moment from "moment";
import { IComment, IPost } from "@/src/types";

export default function PostData({ post }: { post: IPost }) {
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleLike = () => {
    //     setLikes(likes + 1);
    // };

    // const handleDislike = () => {
    //     setDislikes(dislikes + 1);
    // };

    // const handleCommentSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (newComment.trim() === "") return;

    //     setIsSubmitting(true);

    //     // Simulate API call
    //     setTimeout(() => {
    //         const newCommentObj = {
    //             id: comments.length + 1,
    //             author: "Current User",
    //             content: newComment,
    //             date: new Date().toISOString().split("T")[0],
    //         };
    //         setComments([...comments, newCommentObj]);
    //         setNewComment("");
    //         setIsSubmitting(false);
    //     }, 1000);
    // };

    console.log(post);

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Card>
                <CardHeader className="flex flex-col items-start">
                    <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar
                            src="/placeholder.svg?height=40&width=40"
                            alt="Author"
                            fallback
                        />
                        <div>
                            <p className="text-sm font-medium">
                                {post?.author?.name}
                            </p>
                            <div className="flex items-center text-xs text-muted-foreground">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                <time dateTime={post?.createdAt}>
                                    {moment(post?.createdAt).format("llll")}
                                </time>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <p className="mb-4">{post?.content}</p>
                    <div className="flex items-center space-x-4">
                        <Button variant="solid" size="sm">
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            {post?.upVotes}
                        </Button>
                        <Button variant="solid" size="sm">
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            {post?.downVotes}
                        </Button>
                    </div>
                </CardBody>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <h2 className="text-2xl font-bold">Comments</h2>
                </CardHeader>
                <CardBody>
                    {post?.comments?.map((comment: IComment) => (
                        <div
                            key={comment._id}
                            className="mb-4 pb-4 border-b last:border-b-0"
                        >
                            <div className="flex items-center space-x-2 mb-2">
                                <Avatar
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="Author"
                                    fallback
                                />
                                <div>
                                    <p className="text-sm font-medium">
                                        {comment?.user?.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {moment(comment?.createdAt).format(
                                            "llll"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <p>{comment?.content}</p>
                        </div>
                    ))}
                </CardBody>
                <CardFooter>
                    <form className="w-full">
                        <Textarea
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="mb-2"
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <MessageSquare className="mr-2 h-4 w-4 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Post Comment
                                </>
                            )}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
