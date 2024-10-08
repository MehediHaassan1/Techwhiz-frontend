"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import uploadImageToCloudinary from "@/src/utils/uploadImageToCloudinary";
import { useUserRegister } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/Loading";
import TWInput from "@/src/components/form/TWInput";
import TWForm from "@/src/components/form/TWForm";
import TWDatePicker from "@/src/components/form/TWDatePicker";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState("male");
  const [profileImage, setProfileImage] = useState<string | "">("");
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const validOptions = ["male", "female", "other"];
  const isInvalid = !validOptions.includes(gender);
  const router = useRouter();
  const {
    mutate: handleUserRegister,
    isPending,
    isSuccess,
  } = useUserRegister();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    switch (true) {
      case !data?.name:
        toast.error("Name is required.");

        return;
      case !data?.email:
        toast.error("Email is required.");

        return;
      case !data?.phone:
        toast.error("Phone number is required.");

        return;
      case !data?.password:
        toast.error("Password is required.");

        return;
      case !gender:
        toast.error("Gender is required.");

        return;
      case !data?.birthday:
        toast.error("Birthday is required.");

        return;
    }

    const registerData: any = {
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      password: data?.password,
      gender: gender,
      birthday: moment(data?.birthday).format("L"),
    };

    if (profileImage) {
      registerData.profileImage = profileImage;
      setProfileImage("");
    }

    handleUserRegister(registerData);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, router]);

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setImageUploadLoading(true);

    try {
      const files = await uploadImageToCloudinary(e.target.files);

      if (files && files.length > 0) {
        setProfileImage(files[0]);
      }
    } catch (error: any) {
      toast.error("Error uploading image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };

  return (
    <>
      {isPending && <Loading />}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center min-h-screen   py-8"
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-xl bg-transparent">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Register</h1>
          </CardHeader>
          <CardBody>
            <div className="text-sm text-gray-500">
              <sup className="text-red-500">*</sup> fields are required
            </div>
            <TWForm onSubmit={onSubmit}>
              <div className="flex flex-col  md:flex-row items-center gap-2">
                <div className="py-3 w-full">
                  <TWInput
                    label={
                      <>
                        Full Name
                        <sup className="ml-1 text-red-500">*</sup>
                      </>
                    }
                    name="name"
                  />
                </div>
                <div className="py-3 w-full">
                  <TWInput
                    label={
                      <>
                        Email
                        <sup className="ml-1 text-red-500">*</sup>
                      </>
                    }
                    name="email"
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="w-full py-3 flex items-center justify-between relative">
                  <TWInput
                    label={
                      <>
                        Password
                        <sup className="ml-1 text-red-500">*</sup>
                      </>
                    }
                    name="password"
                    type={showPassword ? "text" : "password"}
                  />

                  <button
                    className="absolute right-0 mr-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className=" size-6" />
                    ) : (
                      <Eye className=" size-6" />
                    )}
                  </button>
                </div>

                <div className="w-full py-3 ">
                  <TWInput
                    label={
                      <>
                        Phone
                        <sup className="ml-1 text-red-500">*</sup>
                      </>
                    }
                    name="phone"
                    type="tel"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <div className="w-full py-3">
                  <TWDatePicker
                    label={
                      <>
                        Date of Birth
                        <sup className="ml-1 text-red-500">*</sup>
                      </>
                    }
                    name="birthday"
                    radius="sm"
                  />
                </div>
                <div className="w-full py-3">
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
              <div className="py-3">
                <div className="min-w-fit flex-1">
                  <label
                    aria-label="Upload image"
                    className="flex h-14 w-full cursor-pointer items-center justify-center rounded border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                    htmlFor="image"
                  >
                    Upload image
                  </label>
                  <input
                    className="hidden rounded"
                    id="image"
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                  />
                </div>
              </div>

              <div className="pt-5">
                <Button
                  fullWidth
                  className="rounded"
                  color="primary"
                  isDisabled={imageUploadLoading}
                  type="submit"
                >
                  Register
                </Button>
              </div>
            </TWForm>
            <div className="mt-4 text-center">
              Already have an account?
              <Link
                className="text-blue-500 hover:underline ml-2"
                href="/login"
              >
                Login here
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}
