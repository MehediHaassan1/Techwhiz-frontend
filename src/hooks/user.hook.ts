import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteUser, getAllUsersFromDB, toggleFollow, toggleStatus, updateProfile, } from "../services/User"
import { toast } from "sonner"



export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsersFromDB(),
  })

}

export const useToggleFollow = () => {
  return useMutation({
    mutationKey: ["follower"],
    mutationFn: async (userId: string) => await toggleFollow(userId),
    onSuccess: () => {
      toast.success("Action successful!")
    },
    onError: (error) => {
      const errorMessage = error?.message || "Failed to perform action."
      toast.error(errorMessage)
    },
  })
}

export const useToggleStatus = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["status"],
    mutationFn: async (
      { userId, action }:
        { userId: string, action: "block" | "unblock" }
    ) => await toggleStatus(userId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success("Status updated successfully!")
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}

export const useDeleteUser = () => {

  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (userId: string) => await deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success("User deleted successfully!")
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}


export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: async (data: any) => await updateProfile(data),
    onSuccess: () => {
      toast.success("User updated successfully!")
    },
    onError: (error) => {
      toast.error(error?.message)
    },
  })
}