"use client";

import {
    CalendarIcon,
    MessageSquare,
    ThumbsDown,
    ThumbsUp,
} from "lucide-react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import moment from "moment";
import { IComment, IPost } from "@/src/types";
import TWForm from "@/src/components/form/TWForm";
import TWTextarea from "@/src/components/form/TWTextArea";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
    useDeleteComment,
    useEditComment,
    usePostComment,
    useVotePost,
} from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { useState } from "react";
import Loading from "@/src/components/Loading";

export default function PostData({ post }: { post: IPost }) {
    const { user, isLoading: userLoading } = useUser();
    const {
        mutate: handlePostComment,
        isPending,
        isSuccess,
    } = usePostComment();
    const { mutate: deleteComment } = useDeleteComment();
    const { mutate: editComment } = useEditComment();
    const { mutate: vote } = useVotePost();

    // State to track which comment is being edited
    const [editingCommentId, setEditingCommentId] = useState<string | null>(
        null
    );
    const [content, setContent] = useState<string>("");

    // Handle new comment submission
    const handleSubmitComment: SubmitHandler<FieldValues> = (data) => {
        const commentData = {
            user: user?._id,
            ...data,
        };
        const commentInfo = {
            postId: post?._id,
            commentData,
        };
        handlePostComment({
            id: commentInfo.postId,
            comment: commentInfo.commentData,
        });
    };

    // Handle Edit
    const handleEdit = (commentId: string, currentContent: string) => {
        setEditingCommentId(commentId);
        setContent(currentContent);
    };

    // Handle save action
    const handleSaveClick = (commentId: string) => {
        editComment({ postId: post?._id, commentId, comment: { content } });
        setEditingCommentId(null);
    };

    const handleCancel = () => {
        setEditingCommentId(null);
    };

    const handleDelete = (commentId: string) => {
        deleteComment({ postId: post?._id, commentId });
    };

    const handleVotes = (postId: string, action: string) => {
        vote({ postId, action });
    };

    return (
        <>
            {userLoading && <Loading />}
            <div className="max-w-3xl mx-auto p-4">
                <Card>
                    <CardHeader className="flex flex-col items-start">
                        <h1 className="text-3xl font-bold mb-2">
                            {post?.title}
                        </h1>
                        <div className="flex items-center space-x-4 mb-4">
                            <Avatar
                                src={post?.author?.profileImage}
                                alt={post?.author?.name}
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
                            <Button
                                variant="solid"
                                size="sm"
                                onClick={() => handleVotes(post?._id, "upvote")}
                            >
                                <ThumbsUp className="mr-2 h-4 w-4" />
                                {post?.upVotes}
                            </Button>
                            <Button
                                variant="solid"
                                size="sm"
                                onClick={() =>
                                    handleVotes(post?._id, "downvote")
                                }
                            >
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
                                        src={comment?.user?.profileImage}
                                        alt={comment?.user?.name}
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
                                {editingCommentId === comment._id ? (
                                    <textarea
                                        className="w-full border border-gray-300 rounded-md p-2"
                                        value={content}
                                        onChange={(e) =>
                                            setContent(e.target.value)
                                        }
                                    />
                                ) : (
                                    <p>{comment?.content}</p>
                                )}
                                {user && user?._id === comment?.user?._id && (
                                    <div className="flex items-center text-sm space-x-2 mt-3">
                                        {editingCommentId === comment._id ? (
                                            <>
                                                <Button
                                                    className="rounded"
                                                    onClick={() =>
                                                        handleSaveClick(
                                                            comment._id
                                                        )
                                                    }
                                                >
                                                    Save
                                                </Button>
                                                <Button
                                                    className="rounded"
                                                    onClick={() =>
                                                        handleCancel()
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button
                                                className="rounded"
                                                onClick={() =>
                                                    handleEdit(
                                                        comment._id,
                                                        comment?.content
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        <Button
                                            className="rounded"
                                            onClick={() =>
                                                handleDelete(comment?._id)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </CardBody>
                    <CardFooter className="w-full">
                        <TWForm onSubmit={handleSubmitComment}>
                            <TWTextarea label="" name="content" />
                            <Button
                                type="submit"
                                className="mt-3 rounded"
                                isDisabled={!user || (isPending && !isSuccess)}
                            >
                                {isPending ? (
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
                        </TWForm>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
