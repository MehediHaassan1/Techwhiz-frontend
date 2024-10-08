import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { DollarSign, FileText, UserCheck, UserPlus } from "lucide-react";

interface IProps {
  totalFollowers: number;
  totalFollowings: number;
  totalPayments: number;
  totalPosts: number;
}

const UserData = ({ total }: { total: IProps }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Total Payments Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h1 className="text-sm font-medium">Total Payments</h1>
          <DollarSign className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">$ {total?.totalPayments}</div>
        </CardBody>
      </Card>

      {/* Total Followers Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium">Total Followers</p>
          <UserPlus className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{total?.totalFollowers}</div>
        </CardBody>
      </Card>

      {/* Total Followings Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium">Total Followings</p>
          <UserCheck className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{total?.totalFollowings}</div>
        </CardBody>
      </Card>

      {/* Total Posts Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium">Total Posts</p>
          <FileText className="w-6 h-6 text-muted-foreground" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold">{total?.totalPosts}</div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserData;
