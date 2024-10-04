"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/table";
import UserCell from "./UserCell";
import { IUser } from "@/src/types";
import { userColumns } from "../adminConstant";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import Loading from "@/src/components/Loading";

const ManageUsersTable = () => {
    const { data } = useGetAllUsers();
    const users = data?.data?.filter((user: IUser) => user?.role === "user");

    return (
        <div>
            {users ? (
                <>
                    <h1 className="text-3xl mb-5">User's Management</h1>
                    <Table className="">
                        <TableHeader columns={userColumns}>
                            {(column) => (
                                <TableColumn
                                    key={column.uid}
                                    align={
                                        column.uid === "actions"
                                            ? "center"
                                            : "start"
                                    }
                                >
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={users} className="rounded z-0">
                            {(user: IUser) => (
                                <TableRow key={user?._id} className="z-0">
                                    {(columnKey) => (
                                        <TableCell>
                                            <UserCell
                                                user={user}
                                                columnKey={columnKey as string}
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

export default ManageUsersTable;
