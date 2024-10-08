"use client";

import { Button } from "@nextui-org/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import TWForm from "@/src/components/form/TWForm";
import TWInput from "@/src/components/form/TWInput";
import changePasswordSchema from "@/src/schema/changePassword.schema";
import { useChangePassword } from "@/src/hooks/auth.hook";
import { userLogout } from "@/src/services/AuthService";

const ChangePassword = () => {
  const { mutate: changePassword, isPending, isSuccess } = useChangePassword();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const passwordInfo = {
      oldPassword: data?.oldPassword,
      newPassword: data?.newPassword,
    };

    changePassword(passwordInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      userLogout();
    }
  }, [isSuccess]);

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Change your password
          </h1>

          <p className="mx-auto my-5 max-w-md text-center text-gray-500">
            To make your app secure change your password regularly. Otherwise it
            will be a great loss for you!
          </p>

          <TWForm
            resolver={zodResolver(changePasswordSchema)}
            onSubmit={onSubmit}
          >
            <div className="mb-3">
              <TWInput label="Old Password" name="oldPassword" />
            </div>
            <div className="mb-3">
              <TWInput label="New Password" name="newPassword" />
            </div>
            <div className="mb-5">
              <TWInput label="Confirm New Password" name="confirmPassword" />
            </div>
            <div className="w-full">
              <Button
                className="w-full rounded"
                isLoading={isPending}
                type="submit"
              >
                Change Password
              </Button>
            </div>
          </TWForm>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
