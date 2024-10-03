import { useMutation } from "@tanstack/react-query"
import { userLogin, userRegister } from "../services/AuthService"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const useUserRegister = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["register"],
    mutationFn: async (registerData) => await userRegister(registerData),
    onSuccess: () => {
      toast.success('Registration successful!');
    },
    onError: () => {
      toast.error('Registration failed!');
    },
  })
}

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["login"],
    mutationFn: async (loginData) => await userLogin(loginData),
    onSuccess: () => {
      toast.success('Login successfully!')
    },
    onError: () => {
      toast.error('Invalid credentials!');
    }
  })
}