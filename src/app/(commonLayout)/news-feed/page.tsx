import NewsCard from "@/src/components/NewsCard";
import SiderNewsCard from "@/src/components/SiderNewsCard";
import { getPosts } from "@/src/services/PostService";
import { IPost } from "@/src/types";

const NewsFeedPage = async () => {
    const data = await getPosts();
    const posts = data?.data as IPost[];

    const popularPosts = posts?.filter((post) => post.upVotes > 200);
    console.log(popularPosts);

    return (
        <div className="container mx-auto  grid md:grid-cols-3">
            <div className="md:col-span-2 space-y-5 p-4">
                {posts.map((post: IPost) => (
                    <NewsCard post={post} key={post._id} />
                ))}
            </div>
            <div className="md:col-span-1 p-4 space-y-5 ">
                <div className="h-fit sticky top-16 ">
                    <h1>Popular Posts</h1>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-5">
                        {popularPosts.map((post: IPost) => (
                            <SiderNewsCard key={post?._id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsFeedPage;
