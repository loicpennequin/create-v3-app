import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkCodeTitles from 'remark-code-titles';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
  site: 'https://create-v3-app.vercel.app',
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['noreferrer noopener'],
          content: {
            type: 'text',
            value: '↗'
          }
        }
      ],
      'rehype-slug',
      ['rehype-autolink-headings', { behavior: 'append' }]
    ],
    shikiConfig: {
      theme: 'dracula',
      wrap: true
    }
  }
});
