/**
 * A Tenor API with better naming conventions.
 *
 * @module
 */
import { search as rawSearch, trending as rawTrending } from './raw-api'

/** Represents a GIF object, but since gif files are heavy, we use video files. */
export interface Gif {
  /** Tenor GIF id. */
  id: string
  /** GIF description. */
  description: string
  /** Video width. */
  width: number
  /** Video height. */
  height: number
  /** Still image of the video. */
  preview: string
  /** GIF as a MP4 file. */
  mp4: string
  /** GIF as a WEBM file. */
  webm: string
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
   * Number of results per page. (max: 50)
   *
   * @default 20
   */
  limit?: number
  /** Page id, given by the `next` field of the result. */
  page?: string
}

export interface SearchOptions extends CommonOptions {
  /** Search term. */
  q: string
}

export interface SearchResult {
  /** GIFs. Yep. */
  results: Gif[]
  /** Next page id. */
  next: string
}

/** Searches for GIFs. */
export const search = async ({
  key,
  q,
  locale,
  safety,
  ratio,
  limit,
  page,
}: SearchOptions): Promise<SearchResult> => {
  const { results, next } = await rawSearch({
    key,
    q,
    locale,
    contentfilter: safety,
    ar_range: ratio,
    limit,
    pos: page,
  })
  return {
    results: results.map(({ id, title, content_description, media }) => ({
      id,
      description: title.length > 0 ? title : content_description,
      width: media[0].tinywebm.dims[0],
      height: media[0].tinywebm.dims[1],
      preview: media[0].tinywebm.preview,
      mp4: media[0].tinymp4.url,
      webm: media[0].tinywebm.url,
    })),
    next,
  }
}

/** Fetches trending GIFs. */
export const trending = async ({
  key,
  locale,
  safety: safe,
  ratio,
  limit,
  page,
}: CommonOptions): Promise<SearchResult> => {
  const { results, next } = await rawTrending({
    key,
    locale,
    contentfilter: safe,
    ar_range: ratio,
    limit,
    pos: page,
  })
  return {
    results: results.map(({ id, title, content_description, media }) => ({
      id,
      description: title.length > 0 ? title : content_description,
      width: media[0].tinywebm.dims[0],
      height: media[0].tinywebm.dims[1],
      preview: media[0].tinywebm.preview,
      mp4: media[0].tinymp4.url,
      webm: media[0].tinywebm.url,
    })),
    next,
  }
}
