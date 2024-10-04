"use client";

import { CheckIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IUser } from "@/src/types";
import {
    CalendarIcon,
    CheckCircle2,
    Lock,
    Mail,
    Phone,
    User,
    XCircle,
} from "lucide-react";
import moment from "moment";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Chip } from "@nextui-org/chip";
import { Badge } from "@nextui-org/badge";

interface IProps {
    user: IUser;
    profileCollapse: boolean;
    setProfileCollapse: (value: boolean) => void;
}

const UserProfile = ({ user, profileCollapse, setProfileCollapse }: IProps) => {
  
    return (
        <AnimatePresence>
            {profileCollapse && (
                <motion.div
                    initial={{ x: "100%", opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "20%", opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        duration: 1,
                    }}
                    className="fixed z-10 h-screen w-full md:w-2/3 lg:w-1/2 top-16 lg:top-0 right-0 bottom-0 bg-black p-8 md:py-4"
                >
                    <div>
                        <X
                            onClick={() => setProfileCollapse(false)}
                            className="size-6 cursor-pointer text-red-500"
                        />
                    </div>
                    <ScrollShadow
                        className="mt-4 mb-8 md:h-[calc(100vh-150px)] lg:h-[calc(100vh-100px)] w-full"
                        hideScrollBar
                    >
                        <div>
                            <Card className="w-full max-w-4xl mx-auto rounded">
                                <CardHeader>
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        {user?.isVerified ? (
                                            <Badge
                                                isOneChar
                                                content={<CheckIcon />}
                                                color="success"
                                                placement="bottom-right"
                                                shape="circle"
                                            >
                                                <Avatar
                                                    isBordered
                                                    radius="full"
                                                    src={user?.profileImage}
                                                    className="w-32 h-32 border-4 border-green-600 z-10"
                                                />
                                            </Badge>
                                        ) : (
                                            <Badge
                                                isOneChar
                                                content={<CheckIcon />}
                                                color="default"
                                                placement="bottom-right"
                                                shape="circle"
                                            >
                                                <Avatar
                                                    isBordered
                                                    radius="full"
                                                    src={user?.profileImage}
                                                    className="w-32 h-32 border-4 border-white z-10"
                                                />
                                            </Badge>
                                        )}
                                        <div className="flex-1 space-y-2 text-center md:text-left">
                                            <CardHeader className="text-2xl font-bold">
                                                {user.name}
                                            </CardHeader>
                                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                                <Chip variant="solid">
                                                    {user.role}
                                                </Chip>
                                                <Chip
                                                    color={
                                                        user?.status ===
                                                        "active"
                                                            ? "success"
                                                            : "danger"
                                                    }
                                                >
                                                    {user?.status}
                                                </Chip>
                                                <Chip
                                                    variant={
                                                        user?.subscription ===
                                                        "free"
                                                            ? "faded"
                                                            : undefined
                                                    }
                                                >
                                                    {user?.subscription}
                                                </Chip>
                                                {user?.isVerified && (
                                                    <Chip
                                                        variant="solid"
                                                        className="bg-green-100"
                                                    >
                                                        Verified
                                                    </Chip>
                                                )}
                                                {user.isDeleted && (
                                                    <Chip color="danger">
                                                        Deleted
                                                    </Chip>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody className="grid gap-6">
                                    <div className="grid gap-2">
                                        <h3 className="font-semibold">
                                            Basic Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    Username:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user.userName}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    Email:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user.email}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    Phone:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user.phone}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    Birthday:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user?.birthday}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="grid gap-2">
                                        <h3 className="font-semibold">
                                            Account Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Gender:
                                                </span>
                                                <span className="text-sm text-muted-foreground capitalize">
                                                    {user.gender}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Lock className="w-4 h-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    Password Changed:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user.passwordChangedAt
                                                        ? moment(
                                                              user?.passwordChangedAt
                                                          ).format(
                                                              "MMMM Do YYYY, h:mm:ss a"
                                                          )
                                                        : "Never"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Followers:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user.followers.length}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Following:
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {user.following.length}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider />
                                    <div className="grid gap-2">
                                        <h3 className="font-semibold">Bio</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {user.bio}
                                        </p>
                                    </div>
                                    <Divider />
                                    <div className="grid gap-2">
                                        <h3 className="font-semibold">
                                            Account Status
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Verified:
                                                </span>
                                                {user.isVerified ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-500" />
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">
                                                    Deleted:
                                                </span>
                                                {user.isDeleted ? (
                                                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-green-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </ScrollShadow>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default UserProfile;
