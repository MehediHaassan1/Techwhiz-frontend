"use client";

import React from "react";
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

interface ManageUsersTableProps {
    users: IUser[];
}

const ManageUsersTable: React.FC<ManageUsersTableProps> = ({ users }) => {
    return (
        <Table>
            <TableHeader columns={userColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody items={users} className="rounded">
                {(user: IUser) => (
                    <TableRow key={user?._id}>
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
    );
};

export default ManageUsersTable;
