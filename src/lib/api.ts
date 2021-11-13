/**
 * A Tenor API with better naming conventions.
 *
 * @module
 */
import type { CommonResults } from './raw-api'
import {
  autocomplete as rawAutocomplete,
  categories as rawCategories,
  gifs as rawGifs,
  random as rawRandom,
  registerShare as rawRegisterShare,
  search as rawSearch,
  searchSuggestions as rawSearchSuggestions,
  trending as rawTrending,
  trendingTerms as rawTrendingTerms,
} from './raw-api'

/** Represents a GIF object. */
export interface Gif {
  /** Tenor GIF id. */
  id: string
  /** GIF description. */
  description: string
  /** GIF width. */
  width: number
  /** GIF height. */
  height: number
  /** Image URL. */
  gif: string
}

export interface CommonOptions {
  /** Tenor API key. You may use `LIVDSRZULELA` for testing. */
  key: string
  /**
   * Search term locale, formatted as `language_COUNTRY`.
   *
   * @default `en_US`
   */
  locale?: string
  /**
   * Safety filter:
   *
   * - `off` - G, PG, PG-13, and R (no nudity)
   * - `low` - G, PG, and PG-13
   * - `medium` - G and PG
   * - `high` - G
   *
   * @default `off`
   * @see https://tenor.com/gifapi/documentation#contentfilter
   */
  safety?: 'off' | 'low' | 'medium' | 'high'
  /**
   * Aspect ratio filter:
   *
   * - `all` - no constraints
   * - `wide` - 0.42 <= aspect ratio <= 2.36
   * - `standard` - 0.56 <= aspect ratio <= 1.78
   *
   * @default `all`
   */
  ratio?: 'all' | 'wide' | 'standard'
  /**
   * Video quality filter. Medium is sufficient for most purposes, even on
   * desktop and hdpi devices.
   *
   * @default `medium`
   */
  quality?: 'low' | 'medium' | 'high'
  /**
   * Number of results per page. (max: 50)
   *
   * @default 20
   */
  limit?: number
  /** Page id, given by the `next` field of the result. */
  page?: string
}

export type GifDetailsOptions = {
  key: string
  /** Array of GIF ids. */
  ids: string[]
  quality?: 'low' | 'medium' | 'high'
  limit?: number
  page?: string
}

export interface SearchOptions extends CommonOptions {
  /** Search term. */
  q: string
}

export interface ResultPage {
  /** GIFs. Yep. */
  results: Gif[]
  /** Next page id. */
  next: string
}

export interface SuggestionOptions {
  /** Tenor API key. You may use `LIVDSRZULELA` for testing. */
  key: string
  /** Search term. */
  q: string
  /**
   * Search term locale, formatted as `language_COUNTRY`.
   *
   * @default `en_US`
   */
  locale?: string
  /**
   * Number of results. (max: 50)
   *
   * @default 10
   */
  limit?: number
}

/** Transforms a `raw-api` response into a friendlier object. */
const formatResponse = (
  { results, next }: CommonResults,
  quality: 'low' | 'medium' | 'high' = 'medium'
): ResultPage => ({
  results: results.map(({ id, title, content_description, media }) => {
    const prefix = ({ low: 'nano', medium: 'tiny', high: '' } as const)[quality]
    return {
      id,
      description: title.length > 0 ? title : content_description,
      width: media[0][`${prefix}gif`].dims[0],
      height: media[0][`${prefix}gif`].dims[1],
      gif: media[0][`${prefix}gif`].url,
    }
  }),
  next,
})

/** Gets details about one or several GIFs. */
export const gifDetails = async ({
  key,
  ids,
  quality,
  limit,
  page,
}: GifDetailsOptions): Promise<ResultPage> =>
  formatResponse(
    await rawGifs({
      key,
      ids: ids.join(','),
      limit,
      pos: page,
    }),
    quality
  )

/** Searches for GIFs. */
export const search = async ({
  key,
  q,
  locale,
  quality,
  safety,
  ratio,
  limit,
  page,
}: SearchOptions): Promise<ResultPage> =>
  formatResponse(
    await rawSearch({
      key,
      q,
      locale,
      contentfilter: safety,
      ar_range: ratio,
      limit,
      pos: page,
    }),
    quality
  )

/** Searches for GIFs, but shuffles the result. */
export const shuffledSearch = async ({
  key,
  q,
  locale,
  quality,
  safety,
  ratio,
  limit,
  page,
}: SearchOptions): Promise<ResultPage> =>
  formatResponse(
    await rawRandom({
      key,
      q,
      locale,
      contentfilter: safety,
      ar_range: ratio,
      limit,
      pos: page,
    }),
    quality
  )

/** Fetches trending GIFs. */
export const trending = async ({
  key,
  locale,
  quality,
  safety,
  ratio,
  limit,
  page,
}: CommonOptions): Promise<ResultPage> =>
  formatResponse(
    await rawTrending({
      key,
      locale,
      contentfilter: safety,
      ar_range: ratio,
      limit,
      pos: page,
    }),
    quality
  )

/** Registers a user’s sharing of a GIF. */
export const registerShare = async (options: {
  key: string
  id: string
  locale?: string
  q?: string
}): Promise<{ status: 'ok' }> => rawRegisterShare(options)

/** Completes the user's search. */
export const autocomplete = async ({
  key,
  q,
  locale,
  limit,
}: SuggestionOptions): Promise<string[]> =>
  (await rawAutocomplete({ key, q, locale, limit })).results

/** Returns related search terms. */
export const related = async ({
  key,
  q,
  locale,
  limit,
}: SuggestionOptions): Promise<string[]> =>
  (await rawSearchSuggestions({ key, q, locale, limit })).results

/** Returns trending search terms. */
export const trendingTerms = async ({
  key,
  locale,
  limit,
}: {
  key: string
  locale?: string
  limit?: number
}) => (await rawTrendingTerms({ key, locale, limit })).results

/** Returns Tenor GIF categories. */
export const categories = async ({
  key,
  type,
  locale,
  safety,
}: {
  key: string
  type?: 'featured' | 'trending'
  locale?: string
  safety?: 'off' | 'low' | 'medium' | 'high'
}) =>
  (await rawCategories({ key, type, locale, contentfilter: safety })).tags.map(
    ({ searchterm, image }) => ({ term: searchterm, gif: image })
  )
