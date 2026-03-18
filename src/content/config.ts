import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.coerce.date(),
        status: z.string().default('[STATUS: ARCHIVED]'),
        fig_01: z.string().optional(),
        repo_url: z.string().url().optional(),
        tags: z.array(z.string())
    }),
});
const projectsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        subtitle: z.string(),
        year: z.number(),
        image: z.string(),
        link: z.string().url(),
        tags: z.array(z.string()),
        order: z.number().optional(),
        blog_slug: z.string().optional(),
        demo_url: z.string().url().optional(),
    }),
});


export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection,
};