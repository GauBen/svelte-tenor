import { DEV } from "esm-env";
import type { z } from "zod";
import type {
  SearchResponseSchema,
  CategoriesResponseSchema,
} from "./schemas.js";

const endpoint = (path: string) =>
  new URL(path, "https://tenor.googleapis.com/v2/");

interface CommonParams {
  /** Tenor API key. */
  key: string;
  client_key?: string;
  country?: string;
  locale?: `${string}_${string}`;
}

interface GifRequestParams extends CommonParams {
  searchfilter?: "" | "sticker" | "sticker,-static" | "sticker,static";
  media_filter?: string;
  ar_range?: "all" | "wide" | "standard";
  limit?: number;
  pos?: string;
}

interface CategoriesRequestParams extends CommonParams {
  type?: "featured" | "trending";
  contentfilter?: "off" | "low" | "medium" | "high";
}

interface GifSearchParams extends GifRequestParams {
  q: string;
  contentfilter?: "off" | "low" | "medium" | "high";
  random?: boolean;
}

export async function search(params: GifSearchParams) {
  const url = endpoint("search");
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || !String(value)) continue;
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url);
  const results = await response.json();
  if (!response.ok) throw new Error(results.error.message);

  if (DEV)
    return (await import("./schemas.js")).SearchResponseSchema.parse(results);
  else return results as z.infer<typeof SearchResponseSchema>;
}

export async function featured(params: GifRequestParams) {
  const url = endpoint("featured");
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || !String(value)) continue;
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url);
  const results = await response.json();
  if (!response.ok) throw new Error(results.error.message);

  if (DEV)
    return (await import("./schemas.js")).SearchResponseSchema.parse(results);
  else return results as z.infer<typeof SearchResponseSchema>;
}

export function categories(params: CategoriesRequestParams) {
  const url = endpoint("categories");
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || !String(value)) continue;
    url.searchParams.set(key, String(value));
  }

  return fetch(url).then(async (response) => {
    const results = await response.json();
    if (!response.ok) throw new Error(results.error.message);

    if (DEV)
      return (await import("./schemas.js")).CategoriesResponseSchema.parse(
        results,
      );
    else return results as z.infer<typeof CategoriesResponseSchema>;
  });
}
