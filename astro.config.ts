import { defineConfig } from 'astro/config';

import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import spectre from './package/src';

import node from '@astrojs/node';
import { spectreDark } from './src/ec-theme';

// https://astro.build/config
export default defineConfig({
  site: 'https://reallifeascode.com',
  output: 'static',
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: 'RealLife{AsCode}',
      openGraph: {
        home: {
          title: 'RealLifeAsCode - Automating Life\'s Challenges',
          description: 'Automating our way through life.'
        },
        blog: {
          title: 'Blog',
          description: 'Interesting things to share'
        },
        projects: {
          title: 'Projects'
        }
      },
      giscus: {
        repository: 'cablesquirrel/rlac',
        repositoryId: 'R_kgDOOCJjJw',
        category: 'General',
        categoryId: 'DIC_kwDOOCJjJ84CqcR1',
        mapping: 'pathname',
        strict: true,
        reactionsEnabled: true,
        emitMetadata: false,
        lang: 'en',
      }
    })
  ],
  adapter: node({
    mode: 'standalone'
  })
});