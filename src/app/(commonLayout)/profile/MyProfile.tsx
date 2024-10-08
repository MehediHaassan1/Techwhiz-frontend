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
} from "@nextui-org/react";
import { MapPinIcon, PhoneIcon, InfoIcon, CheckIcon } from "lucide-react";
import Link from "next/link";

import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/Loading";
import TWModal from "@/src/components/modal/TWModal";

import ProfileUpdateModal from "./ProfileUpdateModal";

export default function MyProfile() {
  const { user, isLoading: userLoading, setIsLoading } = useUser();

  if (!user) return null;

  return (
    <>
      {userLoading && <Loading />}
      <div className="max-w-4xl mx-auto p-4">
        {/* Cover Photo */}
        <div className="relative mb-16">
          <Image
            alt="Cover Photo"
            className="w-full h-48 sm:h-64 object-cover rounded-xl"
            src={
              user?.coverImage ||
              `"https://images.unsplash.com/photo-1726231160459-308206afb13c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D" width="100%"`
            }
          />
          {user?.isVerified ? (
            <div className="absolute -bottom-16 left-4">
              <Badge
                isOneChar
                color="success"
                content={<CheckIcon />}
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  isBordered
                  className="w-32 h-32 border-4 border-green-600 z-10"
                  radius="full"
                  src={user?.profileImage}
                />
              </Badge>
            </div>
          ) : (
            <div className="absolute -bottom-16 left-4">
              <Badge
                isOneChar
                color="default"
                content={<CheckIcon />}
                placement="bottom-right"
                shape="circle"
              >
                <Avatar
                  isBordered
                  className="w-32 h-32 border-4 border-white z-10"
                  radius="full"
                  src={user?.profileImage}
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
            <p className="text-gray-600">Web Developer | Tech Blogger</p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            {user && !user.isVerified && (
              <Button as={Link} className="rounded" href="/choose-plan">
                Verify
              </Button>
            )}
            <TWModal btnText="Edit Profile" size="2xl" title="Update Profile">
              {(closeModal) => (
                <ProfileUpdateModal
                  closeModal={closeModal}
                  setIsLoading={setIsLoading}
                  user={user}
                />
              )}
            </TWModal>
          </div>
        </div>

        {/* Followers and Following */}
        <div className="flex gap-4 mb-8">
          <div className="text-center">
            {user?.followers?.length > 0 ? (
              <TWModal
                btnText={`${user?.followers?.length} Followers`}
                scrollBehavior="inside"
                title="Followers"
              >
                {user?.followers?.map((user) => (
                  <div key={user?._id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="rounded-full"
                          size="sm"
                          src={user?.profileImage}
                        />
                        <span>{user?.name}</span>
                      </div>
                      <div>
                        <Button className="rounded" size="sm">
                          Follow
                        </Button>
                      </div>
                    </div>
                    <Divider className="mt-2" />
                  </div>
                ))}
              </TWModal>
            ) : (
              <Button className="rounded">0 Followers</Button>
            )}
          </div>

          <div className="text-center">
            {user!.following?.length > 0 ? (
              <TWModal
                btnText={`${user!.following?.length} Following`}
                scrollBehavior="inside"
                title="Following"
              >
                {user?.following?.map((user) => (
                  <div key={user?._id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="rounded-full"
                          size="sm"
                          src={user?.profileImage}
                        />
                        <span>{user?.name}</span>
                      </div>
                      <div>
                        <Button className="rounded" size="sm">
                          Unfollow
                        </Button>
                      </div>
                    </div>
                    <Divider className="mt-2" />
                  </div>
                ))}
              </TWModal>
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
              <h2 className="text-lg font-semibold">Bio</h2>
            </div>
            <p className="mb-4">{user?.bio}</p>
            <Divider className="my-4" />
            <div className="flex items-center gap-2 mb-2">
              <MapPinIcon size={20} />
              <p>{user?.address || "N/A"}</p>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon size={20} />
              <p>(+88) {user?.phone}</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
