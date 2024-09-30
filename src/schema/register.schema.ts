import { z } from 'zod';

const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters long" })
    .max(50, { message: "Full Name must be at most 50 characters long" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .regex(/^(\+?\d{1,3}[-.\s]?)?\d{10}$/, { message: "Please enter a valid 10 digit phone number" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export default registerSchema;