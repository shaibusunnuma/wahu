import { z } from "zod";

export const profileSchema = {
  create: z.object({
    body: z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      address: z.string().optional(),
      dob: z.string().optional(),
      gender: z.string().optional(),
      phone: z.string().optional(),
      //Add more fields as needed
    }),
  }),

  update: z.object({
    body: z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      dob: z.string().optional(),
      gender: z.string().optional(),
    }),
  }),
};
