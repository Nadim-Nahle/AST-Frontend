import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().regex(/^[A-Za-z]+$/),
  lastName: z.string().regex(/^[A-Za-z]+$/),
  jobTitle: z.string().min(2),
  avatar: z.string().url(),
});

export type UserFormData = z.infer<typeof userSchema>;
