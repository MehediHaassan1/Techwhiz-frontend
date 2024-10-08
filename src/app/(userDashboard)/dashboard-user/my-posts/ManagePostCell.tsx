"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { Trash2 } from "lucide-react";
import React from "react";

import { useDeletePost } from "@/src/hooks/post.hook";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";

import UpdatePostModal from "./UpdatePostModal";

interface PostCellProps {
  post: any;
  columnKey: string;
}

const ManagePostCell: React.FC<PostCellProps> = ({ post, columnKey }) => {
  const cellValue = post[columnKey];
  const { mutate: deletePost } = useDeletePost();
  const { user } = useUser();

  const handleDelete = (id: string) => {
    deletePost(id);
  };

  switch (columnKey) {
    case "title":
      return (
        <Tooltip closeDelay={100} content={cellValue}>
          <p>
            {cellValue.length > 20 ? cellValue.slice(0, 20) : cellValue}
            ...
          </p>
        </Tooltip>
      );
    case "upVotes":
      return <p> {cellValue.length}</p>;
    case "downVotes":
      return <p> {cellValue.length}</p>;
    case "comments":
      return <p>{cellValue?.length}</p>;
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-3">
          {/* View Profile Tooltip */}
          <Tooltip content="Edit Post">
            <span className="z-1 text-lg text-green-400 cursor-pointer active:opacity-50">
              <UpdatePostModal post={post} user={user as IUser} />
            </span>
          </Tooltip>

          {/* Delete User Tooltip */}
          <Tooltip color="danger" content="Delete Post">
            <span className="z-1 text-lg text-danger cursor-pointer active:opacity-50">
              <Button className="rounded">
                <Trash2
                  className="text-red-400"
                  onClick={() => handleDelete(post?._id)}
                />
              </Button>
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default ManagePostCell;
