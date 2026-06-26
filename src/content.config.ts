import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.date(),
    link: z.string().url(),
  }),
});

const homelab = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/homelab" }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { projects, homelab };
