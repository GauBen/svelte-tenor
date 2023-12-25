import { z } from "zod";

/**
 * @see https://developers.google.com/tenor/guides/response-objects-and-errors#media-object
 */
const ContentFormatSchema = z.enum([
  "gif_transparent",
  "gif",
  "loopedmp4",
  "mediumgif",
  "mp4",
  "nanogif_transparent",
  "nanogif",
  "nanomp4",
  "nanowebm",
  "nanowebp_transparent",
  "preview",
  "tinygif_transparent",
  "tinygif",
  "tinymp4",
  "tinywebm",
  "tinywebp_transparent",
  "webm",
  "webp_transparent",
  // Not documented additional values
  "gifpreview_transparent",
  "gifpreview",
  "nanogifpreview_transparent",
  "nanogifpreview",
  "nanowebppreview_transparent",
  "tinygifpreview_transparent",
  "tinygifpreview",
  "tinywebppreview_transparent",
  "webppreview_transparent",
  "png_transparent",
]);

/**
 * @see https://developers.google.com/tenor/guides/response-objects-and-errors#media-object
 */
const MediaObjectSchema = z.object({
  url: z.string().url(),
  dims: z.tuple([z.number(), z.number()]),
  duration: z.number(),
  size: z.number().int(),
});

/**
 * @see https://developers.google.com/tenor/guides/response-objects-and-errors#response-object
 */
const ResponseObjectSchema = z.object({
  created: z.number(),
  hasaudio: z.boolean(),
  id: z.string(),
  media_formats: z.record(ContentFormatSchema, MediaObjectSchema),
  tags: z.string().array(),
  title: z.string(),
  content_description: z.string(),
  itemurl: z.string().url(),
  hascaption: /* Mis-documented type */ z.boolean().optional(),
  flags: /* Mis-documented type */ z.string().array(),
  bg_color: /* Mis-documented type */ z.string().optional(),
  url: z.string().url(),
});

/**
 * @see https://developers.google.com/tenor/guides/response-objects-and-errors#category-object
 */
const CategoryObjectSchema = z.object({
  searchterm: z.string(),
  path: z.string(),
  image: z.string(),
  name: z.string(),
});

/**
 * @see https://developers.google.com/tenor/guides/endpoints#search
 */
export const SearchResponseSchema = z.object({
  next: z.string(),
  results: z.array(ResponseObjectSchema),
});

/**
 * @see https://developers.google.com/tenor/guides/endpoints#categoriestags
 */
export const CategoriesResponseSchema = z.object({
  tags: z.array(CategoryObjectSchema),
});
