import BecomeAPremiumMember from "./components/Ad";
import BentoGridNews from "./components/BentoGridNews";
import MainNewsFeed from "./components/MainNewsFeed";

const NewsFeedPage = () => {
  return (
    <>
      <div className="container mx-auto">
        <BecomeAPremiumMember />
        <BentoGridNews />
        <MainNewsFeed />
      </div>
    </>
  );
};

export default NewsFeedPage;
