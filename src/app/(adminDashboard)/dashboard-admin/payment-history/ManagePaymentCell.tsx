"use client";

import { Tooltip } from "@nextui-org/react";
import { User } from "@nextui-org/user";
import { EyeIcon } from "lucide-react";
import moment from "moment";
import { useState } from "react";

import PackagePreview from "./PackagePreview";

interface UserCellProps {
  payment: any;
  columnKey: string;
}

const ManagePaymentCell: React.FC<UserCellProps> = ({ payment, columnKey }) => {
  const cellValue = payment[columnKey];
  const [packageCollapse, setPackageCollapse] = useState(false);

  switch (columnKey) {
    case "user":
      return (
        <User
          avatarProps={{ src: payment?.user?.profileImage }}
          description={payment?.user?.email}
          name={payment?.user?.name}
        >
          {payment?.user?.email}
        </User>
      );

    case "packagePrice":
      return <p>${cellValue}</p>;

    case "startDate":
      return <p>{moment(cellValue).format("MMMM Do YYYY")}</p>;

    case "endDate":
      return <p>{moment(cellValue).format("MMMM Do YYYY")}</p>;

    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-3">
          <Tooltip content="Details">
            <button
              className="z-1 text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => setPackageCollapse(true)}
            >
              <EyeIcon />
            </button>
          </Tooltip>

          {packageCollapse && (
            <PackagePreview
              data={payment}
              packageCollapse={packageCollapse}
              setPackageCollapse={setPackageCollapse}
            />
          )}
        </div>
      );
    default:
      return <>{cellValue}</>;
  }
};

export default ManagePaymentCell;
