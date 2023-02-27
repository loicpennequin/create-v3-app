import type { MarkdownHeading } from 'astro';

export type ToCEntry = MarkdownHeading & {
  children: ToCEntry[];
  parent?: ToCEntry;
};
