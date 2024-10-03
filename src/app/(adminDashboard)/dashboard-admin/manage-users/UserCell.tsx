"use client";

import React from "react";
import { EyeIcon, EditIcon, Trash2 } from "lucide-react";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/react";

interface UserCellProps {
    user: any;
    columnKey: string;
}

const UserCell: React.FC<UserCellProps> = ({ user, columnKey }) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
        case "name":
            return (
                <User
                    avatarProps={{ src: user.profileImage }}
                    description={user.email}
                    name={cellValue}
                >
                    {user.email}
                </User>
            );
        case "subscription":
            return (
                <p
                    className={`capitalize ${
                        cellValue === "free"
                            ? "text-yellow-400"
                            : "text-green-400"
                    }`}
                >
                    {cellValue}
                </p>
            );
        case "gender":
            return <p className="capitalize">{cellValue}</p>;
        case "actions":
            return (
                <div className="relative flex items-center justify-center gap-3">
                    <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EyeIcon />
                        </span>
                    </Tooltip>
                    <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <EditIcon />
                        </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete user">
                        <span
                            onClick={() => console.log(user?._id)}
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                        >
                            <Trash2 />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return <>{cellValue}</>;
    }
};

export default UserCell;
