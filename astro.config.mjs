// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import decapCmsOauth from 'astro-decap-cms-oauth';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    site: 'https://alecastro.dev',
    integrations: [svelte(), decapCmsOauth(), sitemap()],
    image: {
        domains: ['res.cloudinary.com'],
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            theme: 'github-dark',
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
    adapter: vercel(),
});