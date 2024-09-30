"use client";

import TWForm from "@/src/components/form/TWForm";
import TWInput from "@/src/components/form/TWInput";
import registerSchema from "@/src/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
    FieldValues,
    SubmitHandler,
} from "react-hook-form";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [gender, setGender] = useState('male');

    const validOptions = ["male", "female", "other"];

    const isInvalid = !validOptions.includes(gender);
  

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        console.log(gender);
        console.log(data);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center min-h-screen   py-8"
        >
            <Card className="w-full max-w-xl bg-transparent">
                <CardHeader className="flex justify-center">
                    <h1 className="text-2xl font-bold">Register</h1>
                </CardHeader>
                <CardBody>
                    <TWForm
                        resolver={zodResolver(registerSchema)}
                        onSubmit={onSubmit}
                    >
                        <div className="flex flex-col  md:flex-row items-center gap-2">
                            <div className="py-3 w-full">
                                <TWInput label="Full Name" name="name" />
                            </div>
                            <div className="py-3 w-full">
                                <TWInput
                                    label="Email"
                                    name="email"
                                    type="email"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            <div className="w-full py-3 flex items-center justify-between relative">
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
                            <div className="w-full py-3 flex items-center justify-between relative">
                                <TWInput
                                    label="Confirm Password"
                                    name="confirmPassword"
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
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2">
                            <div className="w-full py-3 ">
                                <TWInput
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                />
                            </div>

                            <div className="w-full py-3">
                                <RadioGroup
                                    label="Gender"
                                    value={gender}
                                    onValueChange={setGender}
                                    orientation="horizontal"
                                    isInvalid={isInvalid}
                                >
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                    <Radio value="other">Other</Radio>
                                </RadioGroup>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            color="primary"
                            fullWidth
                            className="rounded"
                        >
                            Register
                        </Button>
                    </TWForm>
                    <div className="mt-4 text-center">
                        Already have an account?
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline ml-2"
                        >
                            Login here
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </motion.div>
    );
}
