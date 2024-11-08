import { z, defineCollection } from 'astro:content';

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    date: z.date(),
    content: z.string(),
  })
});

const tags = defineCollection({
    type: 'data',
    schema: z.array(z.string())
});

const directoryCollection = defineCollection({
    type: 'content', // v2.5.0 and later
    schema: z.object({
      title: z.string(),
      tags: z.array(z.string()).refine((tags) => {
        const validTags = import.meta.glob('../content/tags.json');
        return tags.every((tag) => tags.includes(tag));
      }),
      image: z.string().optional(),
      description: z.string(),
      url: z.string(),
    }),
});

export const collections = {
  'post': postCollection,
  'directory': directoryCollection,
  'tags': tags,
};
