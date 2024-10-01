"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { zodResolver } from "@hookform/resolvers/zod";
import TWForm from "@/src/components/form/TWForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import loginSchema from "@/src/schema/login.schema";
import TWInput from "@/src/components/form/TWInput";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/Loading";
import { useUser } from "@/src/context/user.provider";

export default function LoginPage() {
    const {
        mutate: handleUserLogin,
        isPending,
        isSuccess,
        data,
    } = useUserLogin();
    const router = useRouter();
    const { setIsLoading } = useUser();
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();

    const redirect = searchParams.get("redirect");

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        handleUserLogin(data);
        setIsLoading(true);
    };

    console.log(data);

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center items-center min-h-screen bg-black/90"
            >
                <Card className="w-full max-w-md bg-transparent">
                    <CardHeader className="flex justify-center">
                        <h1 className="text-2xl font-bold">Login</h1>
                    </CardHeader>
                    <CardBody>
                        <TWForm
                            resolver={zodResolver(loginSchema)}
                            onSubmit={onSubmit}
                        >
                            <div className="py-3">
                                <TWInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                />
                            </div>
                            <div className="py-3 flex items-center justify-between relative">
                                <TWInput
                                    label="Password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                />

                                <div
                                    className="absolute right-0 mr-2"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className=" size-6" />
                                    ) : (
                                        <Eye className=" size-6" />
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                className="rounded"
                            >
                                Login
                            </Button>
                        </TWForm>
                        <div className="mt-4 text-center">
                            Don't have an account?
                            <Link
                                href="/register"
                                className="text-blue-500 hover:underline ml-2"
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
