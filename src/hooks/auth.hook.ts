"use client";

import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  changePassword,
  userLogin,
  userRegister,
} from "../services/AuthService";
import { IChangePassword } from "../types";

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["register"],
    mutationFn: async (registerData) => await userRegister(registerData),
  });
};

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["login"],
    mutationFn: async (loginData) => {
      console.log(loginData, "hook");

      return await userLogin(loginData);
    },
    onSuccess: () => {
      toast.success("Login successfully!");
    },
    onError: (error) => {
      const errorMessage = error?.message || "Login failed!";

      toast.error(errorMessage);
    },
  });
};

export const useChangePassword = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["change-password"],
    mutationFn: async (data) => await changePassword(data as IChangePassword),
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};
