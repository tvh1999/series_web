import { z } from "zod";

export const formSchema = z.object({
  searchQuery: z
    .string()
    .min(2, {
      message: "Your search query must be at least 2 characters.",
    })
    .max(70, {
      message: "Your search query must be less than 50 characters.",
    }),
});

export const reviewFormSchema = z.object({
  title: z.string().min(2).max(50),
  content: z
    .string()
    .min(2, { message: "Your review must be at least 2 characters. " })
    .max(500, { message: "Your review must be less than 500 characters. " }),
});

export const editFormSchema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  location: z.string().min(2).max(30),
  description: z.string().min(2).max(500),
});
