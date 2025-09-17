import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: z.string().optional(),
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
    }),
});


export const collections = {
    'blog': blogCollection,
    'projects': projectsCollection,
};