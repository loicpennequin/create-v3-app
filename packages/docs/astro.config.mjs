import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  markdown: {
    plugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap'
        }
      ]
    ]
  }
});
