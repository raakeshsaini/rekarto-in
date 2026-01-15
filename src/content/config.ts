import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    image: z.string(),        // REQUIRED
    imageAlt: z.string(),     // REQUIRED
    tags: z.array(z.string()).optional(),
  }),
});


export const collections = {
  blog,
};
