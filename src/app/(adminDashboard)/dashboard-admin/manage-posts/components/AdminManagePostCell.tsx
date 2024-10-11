"use client";

import { Button, Tooltip } from "@nextui-org/react";
import { Trash2 } from "lucide-react";

import { useDeletePost } from "@/src/hooks/post.hook";

interface PostCellProps {
  post: any;
  columnKey: string;
}

const AdminManagePostCell: React.FC<PostCellProps> = ({ post, columnKey }) => {
  const cellValue = post[columnKey];
  const { mutate: deletePost } = useDeletePost();

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

export default AdminManagePostCell;
