import { defineCollection, z } from "astro:content";

const interventionCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image().refine((img) => img.width >= 0, {
        message: "Cover image must be at least 300 pixels wide!",
      }),
      picto: image().refine((img) => img.width >= 0, {
        message: "Cover image must be at least 300 pixels wide!",
      }),
      description: z.string(),
      numb: z.string(),
    }),
});

const tarifCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      img: image().refine((img) => img.width >= 0, {
        message: "Cover image must be at least 300 pixels wide!",
      }),
      body: z.string(),
      priceMin: z.number(),
      priceMax: z.number(),
    }),
});

export const collections = {
  intervention: interventionCollection,
  tarifs: tarifCollection,
};
