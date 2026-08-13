import { z } from "zod";

export const registerSchema = z.object({
   name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot be more than 50 characters."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(128, "Password cannot be more than 128 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email."),

  password: z
    .string()
    .min(1, "Password is required.")
    .max(128, "Password cannot be more than 128 characters."),
});