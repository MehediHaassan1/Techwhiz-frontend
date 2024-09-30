"use client";

import {
    BookmarkIcon,
    ThumbsUpIcon,
    ThumbsDownIcon,
    MessageCircleIcon,
} from "lucide-react";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { Textarea } from "@nextui-org/input";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { useState } from "react";
import Image from "next/image";
import { Link } from "@nextui-org/link";

export default function NewsCard() {
    const [likes, setLikes] = useState(42);
    const [dislikes, setDislikes] = useState(5);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([
        { id: 1, author: "Alice", content: "Great article! Very insightful." },
        {
            id: 2,
            author: "Bob",
            content: "I have a different perspective on this.",
        },
    ]);
    const [newComment, setNewComment] = useState("");

    const handleLike = () => {
        if (userLiked) {
            setLikes(likes - 1);
            setUserLiked(false);
        } else {
            setLikes(likes + 1);
            setUserLiked(true);
            if (userDisliked) {
                setDislikes(dislikes - 1);
                setUserDisliked(false);
            }
        }
    };

    const handleDislike = () => {
        if (userDisliked) {
            setDislikes(dislikes - 1);
            setUserDisliked(false);
        } else {
            setDislikes(dislikes + 1);
            setUserDisliked(true);
            if (userLiked) {
                setLikes(likes - 1);
                setUserLiked(false);
            }
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    author: "You",
                    content: newComment.trim(),
                },
            ]);
            setNewComment("");
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar
                    className="w-12 h-12"
                    src="/placeholder.svg?height=50&width=50"
                    showFallback
                    name="Jane"
                />

                <div className="flex flex-col">
                    <p className="text-lg font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">Mar 15 · 5 min read</p>
                </div>
            </CardHeader>
            <CardBody className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <Link
                            href="1"
                            className="text-2xl font-bold leading-tight"
                        >
                            The Future of Artificial Intelligence: Promises and
                            Perils
                        </Link>
                        <p className="text-gray-500 line-clamp-3">
                            As AI continues to evolve at an unprecedented pace,
                            we find ourselves on the cusp of a technological
                            revolution. This article explores the potential
                            benefits and challenges that lie ahead in the world
                            of artificial intelligence.
                        </p>
                    </div>
                    <Image
                        alt="Article thumbnail"
                        className="rounded-lg object-cover w-full md:w-1/3 h-48 md:h-auto"
                        height="200"
                        src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                        style={{
                            aspectRatio: "300/200",
                            objectFit: "cover",
                        }}
                        width="300"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Chip variant="solid">AI</Chip>
                    <Chip variant="solid">Technology</Chip>
                    <Chip variant="solid">Future</Chip>
                    <Chip variant="solid">AI</Chip>
                </div>
            </CardBody>
            <CardFooter className="flex flex-col gap-4">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={handleLike}>
                            <ThumbsUpIcon
                                className={`w-5 h-5 mr-2 ${
                                    userLiked ? "text-green-500" : ""
                                }`}
                            />
                            {likes}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleDislike}
                        >
                            <ThumbsDownIcon
                                className={`w-5 h-5 mr-2 ${
                                    userDisliked ? "text-red-500" : ""
                                }`}
                            />
                            {dislikes}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowComments(!showComments)}
                        >
                            <MessageCircleIcon className="w-5 h-5 mr-2" />
                            {comments.length}
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                            <BookmarkIcon className="w-5 h-5 mr-2" />
                            Save
                        </Button>
                    </div>
                </div>
                {showComments && (
                    <div className="w-full space-y-4">
                        <h3 className="font-semibold">Comments</h3>
                        {comments.map((comment) => (
                            <div key={comment.id} className="border-t pt-2">
                                <p className="font-semibold">
                                    {comment.author}
                                </p>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                        <form
                            onSubmit={handleCommentSubmit}
                            className="space-y-2"
                        >
                            <Textarea
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Button type="submit">Post Comment</Button>
                        </form>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}
