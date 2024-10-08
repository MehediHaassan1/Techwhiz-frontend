"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { useGetMyPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";
import Loading from "@/src/components/Loading";

import { postColumns } from "../userConstant";

import ManagePostCell from "./ManagePostCell";

const ManagePostsTable = () => {
  const { data } = useGetMyPosts();

  return (
    <div>
      {data?.data ? (
        <>
          <h1 className="text-3xl mb-5">Posts Management</h1>
          <Table className="">
            <TableHeader columns={postColumns}>
              {(column) => (
                <TableColumn
                  key={column?.uid}
                  align={column?.uid === "actions" ? "center" : "start"}
                >
                  {column?.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody className="rounded z-0" items={data?.data}>
              {(post: IPost) => (
                <TableRow key={post?._id} className="z-0">
                  {(columnKey) => (
                    <TableCell>
                      <ManagePostCell
                        columnKey={columnKey as string}
                        post={post}
                      />
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ManagePostsTable;
