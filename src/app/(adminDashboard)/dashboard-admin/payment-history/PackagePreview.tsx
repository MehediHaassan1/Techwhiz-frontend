"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import {
  CalendarIcon,
  CheckIcon,
  CircleCheck,
  Clock,
  Mail,
  Receipt,
  User,
  X,
} from "lucide-react";
import { Chip } from "@nextui-org/chip";
import moment from "moment";

import { IPayment } from "@/src/types";

interface IProps {
  data: IPayment;
  packageCollapse: boolean;
  setPackageCollapse: (value: boolean) => void;
}

const PackagePreview = ({
  data,
  packageCollapse,
  setPackageCollapse,
}: IProps) => {
  return (
    <AnimatePresence>
      {packageCollapse && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="fixed z-10 min-h-screen w-full md:w-2/3 lg:w-1/2 top-16 lg:top-0 right-0 bottom-0 bg-black p-8 md:py-4 overflow-y-auto"
          exit={{ x: "20%", opacity: 1 }}
          initial={{ x: "100%", opacity: 1 }}
          style={{
            top: "10%",
            transform: "translate(-0%, -50%)",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            duration: 1,
          }}
        >
          <div className="w-full flex justify-end">
            <X
              className="size-6 cursor-pointer text-red-500"
              onClick={() => setPackageCollapse(false)}
            />
          </div>
          <ScrollShadow
            hideScrollBar
            className="mt-4 mb-8 md:h-[calc(100vh-150px)] lg:h-[calc(100vh-100px)] w-full"
          >
            <div>
              <Card className="w-full max-w-4xl mx-auto rounded">
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {data?.user?.isVerified ? (
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
                          src={data?.user?.profileImage}
                        />
                      </Badge>
                    ) : (
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
                          src={data?.user?.profileImage}
                        />
                      </Badge>
                    )}
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <CardHeader className="text-2xl font-bold">
                        {data?.user?.name}
                      </CardHeader>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <Chip variant="solid">{data?.user?.role}</Chip>
                        <Chip
                          color={
                            data?.user?.status === "active"
                              ? "success"
                              : "danger"
                          }
                        >
                          {data?.user?.status}
                        </Chip>
                        {data?.user?.isVerified && (
                          <Chip
                            className="bg-green-300 text-black"
                            variant="solid"
                          >
                            Verified
                          </Chip>
                        )}
                        {data?.user?.isDeleted && (
                          <Chip color="danger">Deleted</Chip>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="grid gap-6">
                  <div className="grid gap-2">
                    <h3 className="font-semibold text-lg">
                      Membership Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Username:</span>
                        <span className="text-sm text-muted-foreground">
                          {data?.user?.userName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Email:</span>
                        <span className="text-sm text-muted-foreground">
                          {data?.user?.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">TrxID:</span>
                        <span className="text-sm text-muted-foreground">
                          {data?.trxID}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {data?.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Start Date:</span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {moment(data?.startDate).format("MMMM Do YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">End Date:</span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {moment(data?.endDate).format("MMMM Do YYYY")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">Start Time:</span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {moment(data?.startDate).format("LT")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium">End Time:</span>
                        <span className="text-sm text-muted-foreground capitalize">
                          {moment(data?.endDate).format("LT")}
                        </span>
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

export default PackagePreview;
