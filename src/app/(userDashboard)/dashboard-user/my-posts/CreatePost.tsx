"use client";

import { CirclePlus } from "lucide-react";

import TWModal from "@/src/components/modal/TWModal";
import { IUser } from "@/src/types";
import { useUser } from "@/src/context/user.provider";

import PostModal from "./PostModal";

const CreatePost = () => {
  const { user } = useUser();

  return (
    <div>
      <TWModal
        btnIcon={<CirclePlus />}
        btnText="Create"
        modalClsName="max-h-[95%]"
        scrollBehavior="inside"
        size="xl"
        title="Create Post"
      >
        {(closeModal) => (
          <PostModal
            btn="Create"
            closeModal={closeModal}
            user={user as IUser}
          />
        )}
      </TWModal>
    </div>
  );
};

export default CreatePost;
