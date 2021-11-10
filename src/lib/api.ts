/**
 * A Tenor API with better naming conventions.
 *
 * @module
 */
import {
  gifs as rawGifs,
  search as rawSearch,
  random as rawRandom,
  trending as rawTrending,
  registerShare as rawRegisterShare,
  CommonResults,
} from './raw-api'

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

export type GifDetailsOptions = {
  key: string
  /** Array of GIF ids. */
  ids: string[]
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

/** Transforms a `raw-api` response into a friendlier object. */
const formatResponse: ({ results, next }: CommonResults) => ResultPage = ({
  results,
  next,
}) => ({
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
})

/** Gets details about one or several GIFs. */
export const gifDetails = async ({
  key,
  ids,
  limit,
  page,
}: GifDetailsOptions): Promise<ResultPage> =>
  formatResponse(
    await rawGifs({
      key,
      ids: ids.join(','),
      limit,
      pos: page,
    })
  )

/** Searches for GIFs. */
export const search = async ({
  key,
  q,
  locale,
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
    })
  )

/** Searches for GIFs, but shuffles the result. */
export const shuffledSearch = async ({
  key,
  q,
  locale,
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
    })
  )

/** Fetches trending GIFs. */
export const trending = async ({
  key,
  locale,
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
    })
  )

/** Registers a user’s sharing of a GIF. */
export const registerShare = async (options: {
  key: string
  id: string
  locale?: string
  q?: string
}): Promise<{ status: 'ok' }> => rawRegisterShare(options)
