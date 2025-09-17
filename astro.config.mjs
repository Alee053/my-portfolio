// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import tailwindcss from '@tailwindcss/vite';

import Icons from 'unplugin-icons/vite'

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    integrations: [svelte()],
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