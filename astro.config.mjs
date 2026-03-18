// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import Icons from 'unplugin-icons/vite'

import vercel from '@astrojs/vercel';

import decapCmsOauth from 'astro-decap-cms-oauth';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), decapCmsOauth()],
    image: {
        domains: ["res.cloudinary.com"],
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        shikiConfig: {
            theme: 'github-dark',
            wrap: true,
        },
    },
    vite: {
        plugins: [tailwindcss(),Icons({
            compiler: 'svelte',
        }),]
      },

  adapter: vercel(),
});