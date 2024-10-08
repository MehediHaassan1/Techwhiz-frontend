import { ReactNode } from "react";

import Sidebar from "@/src/components/sidebar/Sidebar";

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen">
      <div className=" flex flex-col md:flex-row h-full gap-12">
        <div className="h-full md:sticky md:top-0 z-50">
          <Sidebar />
        </div>

        <div className="flex-1 pr-12 pt-12">{children}</div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
