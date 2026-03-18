import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        tags: z.array(z.string()),
        repo_url: z.string().url().optional(),
    }),
});
const projectsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        subtitle: z.string(),
        year: z.number(),
        repo_url: z.string().url().optional(),
        blog_slug: z.string().optional(),
        demo_url: z.string().url().optional(),
        tags: z.array(z.string()),
        order: z.number().optional(),
    }),
});


export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection,
};