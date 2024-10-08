import CreatePost from "./CreatePost";
import ManagePostsTable from "./ManagePostsTable";

const MyPosts = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Posts</h1>

        <CreatePost />
      </div>
      <div>
        <ManagePostsTable />
      </div>
    </div>
  );
};

export default MyPosts;
