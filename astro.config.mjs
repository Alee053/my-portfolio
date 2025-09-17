// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import Icons from 'unplugin-icons/vite'

import vercel from '@astrojs/vercel';

import decapCmsOauth from 'astro-decap-cms-oauth';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte(), decapCmsOauth()],
    image: {
        domains: ["res.cloudinary.com"],
    },
    vite: {
        plugins: [tailwindcss(),Icons({
            compiler: 'svelte',
        }),]
      },

  adapter: vercel(),
});