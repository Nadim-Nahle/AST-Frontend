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
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().regex(/^[A-Za-z]+$/),
  lastName: z.string().regex(/^[A-Za-z]+$/),
  jobTitle: z.string().min(2),
  avatar: z.string().url().optional(),
});

export const updateUserSchema = baseSchema;
