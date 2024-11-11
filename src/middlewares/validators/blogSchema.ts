import { z } from "zod";

export const blogSchema = {
  create: z.object({
    body: z.object({
      title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title must be less than 100 characters"),
      content: z.string().min(1, "Content is required"),
      authorId: z.string().optional(),
    }),
  }),

  update: z.object({
    params: z.object({
      id: z.string().min(1, "Blog ID is required"),
    }),
    body: z.object({
      title: z
        .string()
        .max(100, "Title must be less than 100 characters")
        .optional(),
      content: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),

  withId: z.object({
    params: z.object({
      id: z.string().min(1, "Blog ID is required"),
    }),
  }),

  filter: z.object({
    query: z.object({
      tags: z.array(z.string()).optional(),
    }),
  }),
};
