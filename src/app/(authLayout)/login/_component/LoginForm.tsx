"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import loginSchema from "@/src/schema/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import TWInput from "@/src/components/form/TWInput";
import TWForm from "@/src/components/form/TWForm";

const LoginForm = () => {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data, "Form");
    handleUserLogin(data);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <div>
      <TWForm resolver={zodResolver(loginSchema)} onSubmit={onSubmit}>
        <div className="py-3">
          <TWInput label="Email" name="email" type="email" />
        </div>
        <div className="py-3 flex items-center justify-between relative">
          <TWInput
            label="Password"
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

        <Button fullWidth className="rounded" color="primary" type="submit">
          Login
        </Button>
      </TWForm>
    </div>
  );
};

export default LoginForm;
