"use client";

import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    Image,
    Divider,
    Badge,
    useDisclosure,
} from "@nextui-org/react";
import { MapPinIcon, PhoneIcon, InfoIcon, CheckIcon } from "lucide-react";
import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/Loading";
import TWModal from "@/src/components/modal/TWModal";

export default function MyProfile() {
    const { user, isLoading: userLoading } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    if (userLoading) return <Loading />;
    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Cover Photo */}
            <div className="relative mb-16">
                <Image
                    src="https://images.unsplash.com/photo-1726231160459-308206afb13c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D"
                    alt="Cover Photo"
                    className="w-full h-48 sm:h-64 object-cover rounded-xl"
                    width="100%"
                />
                {user?.isVerified ? (
                    <div className="absolute -bottom-16 left-4">
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
                                className="w-32 h-32 border-4 border-white z-10"
                            />
                        </Badge>
                    </div>
                ) : (
                    <div className="absolute -bottom-16 left-4">
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
                    </div>
                )}
            </div>

            {/* Profile Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold mt-5">{user?.name}</h1>
                    <p className="text-gray-600">{user?.userName}</p>
                    <p className="text-gray-600">
                        Web Developer | Tech Blogger
                    </p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Button className="rounded">Edit Profile</Button>
                </div>
            </div>

            {/* Followers and Following */}
            <div className="flex gap-4 mb-8">
                <div className="text-center">
                    {user!.followers?.length > 0 ? (
                        <>
                            <Button onPress={onOpen}>
                                {user?.followers.length} Followers
                            </Button>
                            <TWModal
                                scrollBehavior="inside"
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                title="Followers"
                            >
                                {user?.followers?.map((user) => (
                                    <div key={user?._id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    size="sm"
                                                    src={user?.profileImage}
                                                    className="rounded-full"
                                                />
                                                <span>{user?.name}</span>
                                            </div>
                                            <div>
                                                <Button
                                                    size="sm"
                                                    className="rounded"
                                                >
                                                    Follow
                                                </Button>
                                            </div>
                                        </div>
                                        <Divider className="mt-2" />
                                    </div>
                                ))}
                            </TWModal>
                        </>
                    ) : (
                        <Button className="rounded">0 Followers</Button>
                    )}
                </div>
                <div className="text-center">
                    {user!.following?.length > 0 ? (
                        <>
                            <Button onPress={onOpen}>
                                {user?.following.length} Followers
                            </Button>

                            <TWModal
                                scrollBehavior="inside"
                                isOpen={isOpen}
                                onOpenChange={onOpenChange}
                                title="Following"
                            >
                                {user?.following?.map((user) => (
                                    <div key={user?._id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    size="sm"
                                                    src={user?.profileImage}
                                                    className="rounded-full"
                                                />
                                                <span>{user?.name}</span>
                                            </div>
                                            <div>
                                                <Button
                                                    size="sm"
                                                    className="rounded"
                                                >
                                                    Unfollow
                                                </Button>
                                            </div>
                                        </div>
                                        <Divider className="mt-2" />
                                    </div>
                                ))}
                            </TWModal>
                        </>
                    ) : (
                        <Button className="rounded" variant="flat">
                            0 Following
                        </Button>
                    )}
                </div>
            </div>

            {/* Others Info */}
            <Card className="mb-8">
                <CardBody>
                    <div className="flex items-center gap-2 mb-4">
                        <InfoIcon size={20} />
                        <h2 className="text-lg font-semibold">About</h2>
                    </div>
                    <p className="mb-4">
                        Passionate web developer and tech blogger with 5+ years
                        of experience. I love creating user-friendly interfaces,
                        solving complex problems, and sharing my knowledge
                        through my blog. When I'm not coding or writing, you can
                        find me exploring new coffee shops or hiking in nature.
                    </p>
                    <Divider className="my-4" />
                    <div className="flex items-center gap-2 mb-2">
                        <MapPinIcon size={20} />
                        <p>123 Tech Street, Silicon Valley, CA 94000</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <PhoneIcon size={20} />
                        <p>(555) 123-4567</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
