import { useMutation } from "@tanstack/react-query"
import { userLogin } from "../services/AuthService"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

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