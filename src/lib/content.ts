import type { CollectionEntry } from 'astro:content';

export type BlogSummary = Pick<
    CollectionEntry<'blog'>['data'],
    'title' | 'description' | 'tags' | 'date'
> & {
    slug: string;
};
