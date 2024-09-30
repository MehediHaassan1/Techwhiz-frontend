import { useMutation } from "@tanstack/react-query"
import { userLogin } from "../services/AuthService"
import { FieldValues } from "react-hook-form"

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["login"],
    mutationFn: async (loginData) => await userLogin(loginData),
  })
}