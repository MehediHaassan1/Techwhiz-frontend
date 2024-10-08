import { z } from "zod";

const changePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Password needs to be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "Password needs to be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password needs to be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export default changePasswordSchema;
