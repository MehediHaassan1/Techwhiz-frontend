import { FilePenLine } from "lucide-react";

import PostModal from "./PostModal";

import TWModal from "@/src/components/modal/TWModal";
import { IPost, IUser } from "@/src/types";

interface IProps {
  user: IUser;
  post: IPost;
}

const UpdatePostModal = ({ user, post }: IProps) => {
  return (
    <div>
      <TWModal
        btnText={<FilePenLine />}
        modalClsName="max-h-[95%]"
        scrollBehavior="inside"
        size="xl"
        title="Update Post"
      >
        {(closeModal) => (
          <PostModal
            btn="Update"
            closeModal={closeModal}
            post={post}
            user={user as IUser}
          />
        )}
      </TWModal>
    </div>
  );
};

export default UpdatePostModal;
