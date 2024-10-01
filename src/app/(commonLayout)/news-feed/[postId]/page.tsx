import { getPost } from "@/src/services/PostService";
import Author from "./Author";
import PostData from "./PostData";

interface IProps {
    params: {
        postId: string;
    };
}

export default async function PostDetails({ params: { postId } }: IProps) {
    const { data } = await getPost(postId);
    return (
        <div className="max-w-3xl mx-auto p-4">
            <PostData post={data} />
            <Author />
        </div>
    );
}
