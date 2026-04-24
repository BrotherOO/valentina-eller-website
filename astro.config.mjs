import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import Icons from 'unplugin-icons/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.schneiderei-eller.de',
  integrations: [
    vue(), 
    sitemap({
      serialize(item) {
        if (item.url === 'https://www.schneiderei-eller.de/') {
          item.changefreq = 'weekly';
          item.priority = 1.0;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        item.lastmod = new Date().toISOString();
        return item;
      }
    })
  ],

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