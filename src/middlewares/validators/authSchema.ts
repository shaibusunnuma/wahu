import { z } from "zod";

export const authSchema = {
  register: z.object({
    body: z.object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
    }),
  }),
};
