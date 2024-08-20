import { z } from "zod";

export const SignupValidationSchema = z.object({
  name: z.string().min(2, { message: "Name too short" }),
  username: z.string().min(2, { message: "Username too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
