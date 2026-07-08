// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import decapCmsOauth from 'astro-decap-cms-oauth';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeArticleImages from './src/lib/rehype/rehype-article-images.mjs';
import rehypeTableWrap from './src/lib/rehype/rehype-table-wrap.mjs';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), decapCmsOauth()],
    image: {
        domains: ["res.cloudinary.com"],
    },
    markdown: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeArticleImages, rehypeTableWrap],
        shikiConfig: {
            theme: 'github-dark',
            wrap: false,
        },
    },
    vite: {
        plugins: [tailwindcss()]
      },

  adapter: vercel(),
});