import Sidebar from "@/src/components/sidebar/Sidebar";

const AdminDashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <div className=" flex flex-col lg:flex-row h-full">
                <div className="h-full md:sticky md:top-0 z-50">
                    <Sidebar />
                </div>

                <div className="flex-1 p-1 md:p-6 lg:p-10">{children}</div>
            </div>
        </div>
    );
};

export default AdminDashBoardLayout;
