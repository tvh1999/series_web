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
