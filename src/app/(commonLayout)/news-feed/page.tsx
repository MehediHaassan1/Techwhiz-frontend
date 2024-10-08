import BecomeAPremiumMember from "./Ad";
import MainNewsFeed from "./MainNewsFeed";

const NewsFeedPage = () => {
  return (
    <>
      <div className="container mx-auto">
        <BecomeAPremiumMember />
        <MainNewsFeed />
      </div>
    </>
  );
};

export default NewsFeedPage;
