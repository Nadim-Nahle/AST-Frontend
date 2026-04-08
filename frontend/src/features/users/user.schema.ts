import { z } from "zod";

const optionalString = z
  .string()
  .transform((val) => (val === "" ? undefined : val))
  .optional();

const baseSchema = z.object({
  email: optionalString,
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  avatar: optionalString,
});

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().regex(/^[A-Za-z]+$/, "Name must only contain letters"),
  lastName: z.string().regex(/^[A-Za-z]+$/, "Name must only contain letters"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  avatar: optionalString,
});

export const updateUserSchema = baseSchema;
export type UserFormData = z.infer<typeof createUserSchema>;
