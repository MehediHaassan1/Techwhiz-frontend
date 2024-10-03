import { getAllUsers } from "@/src/services/User";
import ManageUsersTable from "./ManageUsersTable";
import { IUser } from "@/src/types";

const ManageUsersPage = async () => {
    const { data } = await getAllUsers();

    const users = data?.filter((user: IUser) => user?.role === "user");

    return (
        <div>
            <h1>Manage Users</h1>
            <ManageUsersTable users={users} />
        </div>
    );
};

export default ManageUsersPage;
