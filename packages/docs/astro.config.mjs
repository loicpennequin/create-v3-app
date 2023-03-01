import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkCodeTitles from 'remark-code-titles';

// https://astro.build/config
export default defineConfig({
  site: 'https://create-v3-app.vercel.app',
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          properties: {},
          behavior: 'wrap'
        }
      ]
    ],
    shikiConfig: {
      theme: 'rose-pine',
      wrap: true
    }
  }
});
