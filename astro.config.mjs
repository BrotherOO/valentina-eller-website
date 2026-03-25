import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.schneiderei-eller.de',
  integrations: [vue(), sitemap()],

  vite: {
    plugins: [
      tailwindcss(),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      })
    ]
  }
});