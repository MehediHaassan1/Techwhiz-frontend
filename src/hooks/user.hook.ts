import { useMutation } from "@tanstack/react-query"
import { toggleFollow } from "../services/User"
import { toast } from "sonner"

export const useToggleFollow = () => {
  return useMutation({
    mutationKey: ["follower"],
    mutationFn: async (userId: string) => await toggleFollow(userId),
    onSuccess: () => {
      toast.success("Action successful!")
    },
    onError: () => {
      toast.error("Failed to perform action. Please try again later.")

    },
  })
}