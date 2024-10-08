"use client";

import { Button } from "@nextui-org/button";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { ChangeEvent, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import TWForm from "@/src/components/form/TWForm";
import TWInput from "@/src/components/form/TWInput";
import TWTextarea from "@/src/components/form/TWTextArea";
import { useUpdateProfile } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";

interface IProps {
  user: IUser;
  setIsLoading: (value: any) => void;
  closeModal: () => void;
}

const ProfileUpdateModal = ({ user, setIsLoading, closeModal }: IProps) => {
  const { mutate: profileUpdate, isSuccess, isPending } = useUpdateProfile();
  const [profileImage, setProfileImage] = useState<string | "">(
    user?.profileImage,
  );
  const [coverImage, setCoverImage] = useState<string | "">(user?.coverImage);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [gender, setGender] = useState(user?.gender);
  const validOptions = ["male", "female", "other"];
  const isInvalid = !validOptions.includes(gender);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const updatedData = { ...data, profileImage, coverImage };

    profileUpdate(updatedData);
  };

  if (isPending) setIsLoading(true);
  if (!isPending && isSuccess) {
    setIsLoading(false);
    closeModal();
  }

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    imageName: string,
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setImageUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files);

      if (files && files?.length > 0 && imageName === "profileImage") {
        setProfileImage(files[0]);
      }
      if (files && files?.length > 0 && imageName === "coverImage") {
        setCoverImage(files[0]);
      }
    } catch (error: any) {
      toast.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  const defaultValues = {
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    bio: user?.bio || "",
  };

  return (
    <TWForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <TWInput label="Full Name" name="name" />
        <TWInput label="Phone" name="phone" />
      </div>
      <div className="flex flex-col md:flex-row gap-3 mb-3">
        <div className="w-full md:w-1/2">
          <TWInput label="Address" name="address" />
        </div>
        <div className="w-full md:w-1/2">
          <RadioGroup
            isInvalid={isInvalid}
            label={
              <>
                Gender
                <sup className="ml-1 text-red-500">*</sup>
              </>
            }
            orientation="horizontal"
            value={gender}
            onValueChange={setGender}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="other">Other</Radio>
          </RadioGroup>
        </div>
      </div>
      <TWTextarea label="Bio" name="bio" />

      <div className="mt-3">
        <div className="min-w-fit flex-1">
          <label
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
            htmlFor="profile-image"
          >
            Upload profile image
          </label>
          <input
            className="hidden rounded"
            id="profile-image"
            type="file"
            onChange={(e) => handleImageChange(e, "profileImage")}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="min-w-fit flex-1">
          <label
            className="flex h-14 w-full cursor-pointer items-center justify-center rounded border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
            htmlFor="cover-image"
          >
            Upload cover image
          </label>
          <input
            className="hidden rounded"
            id="cover-image"
            type="file"
            onChange={(e) => handleImageChange(e, "coverImage")}
          />
        </div>
      </div>

      <div>
        <Button
          className="rounded mt-5 w-full"
          isDisabled={imageUploadLoading}
          type="submit"
        >
          Update
        </Button>
      </div>
    </TWForm>
  );
};

export default ProfileUpdateModal;
