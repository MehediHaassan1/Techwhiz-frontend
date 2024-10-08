"use client";

import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";
import dynamic from "next/dynamic";
import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import TWForm from "@/src/components/form/TWForm";
import TWInput from "@/src/components/form/TWInput";
import TWSelect from "@/src/components/form/TWSelect";
import TWTagInput from "@/src/components/form/TWTagInput";
import { IPost, IUser } from "@/src/types";
import handleBase64Images from "@/src/utils/handleBase64Images";
import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";
import "react-quill/dist/quill.snow.css";
import { useCreatePost, useUpdatePost } from "@/src/hooks/post.hook";
import TWTextarea from "@/src/components/form/TWTextArea";

interface IProps {
  post?: IPost;
  user: IUser;
  closeModal: () => void;
  btn: string;
}

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const PostModal = ({ post, user, btn, closeModal }: IProps) => {
  const { mutate: createPost, isPending, isSuccess } = useCreatePost();
  const {
    mutate: updatePost,
    isPending: updatePending,
    isSuccess: updateSuccess,
  } = useUpdatePost();
  const [value, setValue] = useState(post?.content || "");
  const [thumbnail, setThumbnail] = useState<string | "">(
    post?.thumbnail || "",
  );
  const [thumbnailUploadLoading, setThumbnailUploadLoading] = useState(false);
  const [premium, setPremium] = useState(post?.isPremium ? "premium" : "free");
  const validOptions = ["free", "premium"];
  const isInvalid = !validOptions.includes(premium);

  const modules = useMemo(() => {
    if (typeof window !== "undefined") {
      const Quill = require("react-quill").Quill;
      const QuillResizeImage = require("quill-resize-image");

      Quill.register("modules/resize", QuillResizeImage);

      return {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        resize: { locale: {} },
      };
    }

    return {};
  }, []);

  const handleUploadThumbnail: ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setThumbnailUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files);

      if (files && files.length > 0) {
        setThumbnail(files[0]);
      }
    } catch (error: any) {
      toast.error("Error uploading image:", error);
    } finally {
      setThumbnailUploadLoading(false);
    }
  };

  const defaultValues = {
    title: post?.title || "",
    description: post?.description || "",
    category: post?.category || "",
    tags: post?.tags || [],
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let modifiedContent = await handleBase64Images(value);

    modifiedContent = modifiedContent.replace(/"/g, "'");

    const title = data?.title;
    const description = data?.description;
    const category = data?.category;
    const content = modifiedContent;
    const tags = data?.tags;
    const author = user?._id as string;
    const isPremium = premium === "premium" ? true : false;

    const postData = {
      title,
      description,
      category,
      content,
      tags,
      author,
      isPremium,
      thumbnail,
    };

    if (btn === "Create") {
      if (
        title === "" ||
        description === "" ||
        category === "" ||
        content === "" ||
        tags.every((tag: string) => tag.trim() === "") ||
        author === undefined ||
        thumbnail === ""
      ) {
        toast.error("Required field must be fulfilled");

        return;
      }
      createPost(postData);
    } else {
      updatePost({ id: post?._id as string, postData });
    }
  };

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      setValue("");
      closeModal();
    }
  }, [isSuccess, closeModal, updateSuccess]);

  return (
    <div>
      <TWForm defaultValues={defaultValues} onSubmit={onSubmit}>
        <div className="mb-3">
          <TWInput
            label={
              <>
                Content Title
                <sup className="ml-1 text-red-500">*</sup>
              </>
            }
            name="title"
          />
        </div>
        <div className="mb-3">
          <TWTextarea
            label={
              <>
                Description
                <sup className="ml-1 text-red-500">*</sup>
              </>
            }
            name="description"
          />
        </div>
        <div className="mb-3 flex items-center gap-3">
          <div className="w-1/2">
            <TWSelect
              label={
                <>
                  Category
                  <sup className="ml-1 text-red-500">*</sup>
                </>
              }
              name="category"
              options={postCategoryOptions}
              radius="sm"
            />
          </div>
          <div className="w-1/2">
            <div className="">
              <RadioGroup
                isInvalid={isInvalid}
                label={
                  <>
                    Post Status
                    <sup className="ml-1 text-red-500">*</sup>
                  </>
                }
                orientation="horizontal"
                value={premium}
                onValueChange={setPremium}
              >
                <Radio value="free">Free</Radio>
                <Radio value="premium">Premium</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <TWTagInput
            chipSize="sm"
            label={
              <>
                Tags
                <sup className="ml-1 text-red-500">*</sup>
              </>
            }
            name="tags"
          />
        </div>
        <div className="mb-3">
          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload thumbnail image
              <sup className="ml-1 text-red-500">*</sup>
            </label>
            <input
              className="hidden rounded"
              id="image"
              type="file"
              onChange={(e) => handleUploadThumbnail(e)}
            />
          </div>
        </div>
        <div className="mb-3">
          <span className="block text-sm text-gray-400 mb-2">
            Content
            <sup className="ml-1 text-red-500">*</sup>
          </span>
          <ReactQuill
            formats={formats}
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-3 rounded"
            isDisabled={thumbnailUploadLoading}
            isLoading={isPending || updatePending}
            type="submit"
          >
            {btn}
          </Button>
        </div>
      </TWForm>
    </div>
  );
};

export default PostModal;

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const postCategoryOptions = [
  { key: "Web", label: "Web" },
  { key: "Software Engineering", label: "Software Engineering" },
  { key: "AI", label: "AI" },
  { key: "ML", label: "ML" },
  { key: "VR", label: "VR" },
  { key: "Others", label: "Others" },
];
