"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import TWForm from "@/src/components/form/TWForm";
import loginSchema from "@/src/schema/login.schema";
import TWInput from "@/src/components/form/TWInput";
import { useUserLogin } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/Loading";
import { useUser } from "@/src/context/user.provider";

export default function LoginPage() {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
    <>
      {isPending && <Loading />}

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center items-center min-h-screen bg-black/90"
        exit={{ opacity: 0, y: -20 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md bg-transparent">
          <CardHeader className="flex justify-center">
            <h1 className="text-2xl font-bold">Login</h1>
          </CardHeader>
          <CardBody>
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

              <Button
                fullWidth
                className="rounded"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </TWForm>
            <div className="mt-4 text-center">
              Don&apos;t have an account?
              <Link
                className="text-blue-500 hover:underline ml-2"
                href="/register"
              >
                Register here
              </Link>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </>
  );
}
