import MyProfile from "./MyProfile";
import MyPosts from "./MyPosts";

export default async function Profile() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <MyProfile />
      <MyPosts />
    </div>
  );
}
