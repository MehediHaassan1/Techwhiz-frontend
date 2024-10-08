"use client";

import React, { useState } from "react";
import { EyeIcon, Trash2, ShieldCheck, ShieldBan } from "lucide-react";
import { User } from "@nextui-org/user";
import { Tooltip } from "@nextui-org/react";

import { useDeleteUser, useToggleStatus } from "@/src/hooks/user.hook";

import UserProfile from "./UserProfile";

interface UserCellProps {
  user: any;
  columnKey: string;
}

const UserCell: React.FC<UserCellProps> = ({ user, columnKey }) => {
  const { mutate: toggleStatus } = useToggleStatus();
  const { mutate: deleteUser } = useDeleteUser();
  const [profileCollapse, setProfileCollapse] = useState(false);
  const cellValue = user[columnKey];

  const handleStatus = (id: string, action: "block" | "unblock") => {
    toggleStatus({ userId: id, action });
  };

  const handleUserDelete = (id: string) => {
    deleteUser(id);
  };

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ src: user?.profileImage }}
          description={user?.email}
          name={cellValue}
        >
          {user?.email}
        </User>
      );
    case "subscription":
      return (
        <p
          className={`capitalize ${
            cellValue === "free" ? "text-yellow-400" : "text-green-400"
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
          {/* View Profile Tooltip */}
          <Tooltip content="Details">
            <span className="z-1 text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon onClick={() => setProfileCollapse(true)} />
            </span>
          </Tooltip>

          {profileCollapse && (
            <UserProfile
              profileCollapse={profileCollapse}
              setProfileCollapse={setProfileCollapse}
              user={user}
            />
          )}

          <Tooltip
            content={
              user?.status === "active" ? "Active profile" : "Blocked Profile"
            }
          >
            <span
              aria-label={
                user?.status === "active"
                  ? "Deactivate user profile"
                  : "Activate user profile"
              }
              className="z-1 text-lg text-danger cursor-pointer active:opacity-50"
            >
              {user?.status === "active" ? (
                <ShieldCheck
                  className="text-green-400"
                  onClick={() => handleStatus(user?._id, "block")}
                />
              ) : (
                <ShieldBan
                  className="text-yellow-400"
                  onClick={() => handleStatus(user?._id, "unblock")}
                />
              )}
            </span>
          </Tooltip>

          {/* Delete User Tooltip */}
          <Tooltip color="danger" content="Delete user">
            <span className="z-1 text-lg text-danger cursor-pointer active:opacity-50">
              <Trash2 onClick={() => handleUserDelete(user?._id)} />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default UserCell;
