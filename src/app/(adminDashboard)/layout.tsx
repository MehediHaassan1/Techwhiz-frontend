import Sidebar from "@/src/components/sidebar/Sidebar";

const AdminDashBoardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen">
            <div className=" flex flex-col md:flex-row h-full gap-12">
                <div className="h-full">
                    <Sidebar />
                </div>

                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
};

export default AdminDashBoardLayout;
