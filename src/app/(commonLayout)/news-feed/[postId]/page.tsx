import { getPost, getPosts } from "@/src/services/PostService";
import Author from "./Author";
import PostData from "./PostData";
import { IPost } from "@/src/types";

interface IProps {
    params: {
        postId: string;
    };
}

export default async function PostDetails({ params: { postId } }: IProps) {
    const { data } = await getPost(postId);
    const { data: posts } = await getPosts();
    const authorPosts = posts
        ?.filter((post: IPost) => post?.author?._id === data?.author?._id)
        ?.slice(0, 2);
    return (
        <div className="max-w-3xl mx-auto p-4">
            <PostData post={data} />
            <Author author={data?.author} authorPosts={authorPosts} />
        </div>
    );
}
