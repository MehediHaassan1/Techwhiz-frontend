"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { IUser } from "@/src/types";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import Loading from "@/src/components/Loading";

import { userColumns } from "../adminConstant";

import UserCell from "./UserCell";

const ManageUsersTable = () => {
  const { data } = useGetAllUsers();
  const users = data?.data?.filter((user: IUser) => user?.role === "user");

  return (
    <div>
      {users ? (
        <>
          <h1 className="text-3xl mb-5">Users Management</h1>
          <Table>
            <TableHeader columns={userColumns}>
              {(column) => (
                <TableColumn
                  key={column?.uid}
                  align={column?.uid === "actions" ? "center" : "start"}
                >
                  {column?.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody className="rounded z-0" items={users}>
              {(user: IUser) => (
                <TableRow key={user?._id} className="z-0">
                  {(columnKey) => (
                    <TableCell>
                      <UserCell columnKey={columnKey as string} user={user} />
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

export default ManageUsersTable;
