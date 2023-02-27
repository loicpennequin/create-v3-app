import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  markdown: {
    plugins: [
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            class: 'heading-link heading-link--hidden---effects',
            'data-heading-link': true
          },
          behavior: 'wrap'
        }
      ]
    ]
  }
});
