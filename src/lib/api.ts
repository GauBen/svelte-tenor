/*
 █████  ██████  ██     ████████ ██    ██ ██████  ███████ ███████
██   ██ ██   ██ ██        ██     ██  ██  ██   ██ ██      ██
███████ ██████  ██        ██      ████   ██████  █████   ███████
██   ██ ██      ██        ██       ██    ██      ██           ██
██   ██ ██      ██        ██       ██    ██      ███████ ███████
*/

export interface GifObject<Formats extends string = GifFormat> {
  /** Tenor result identifier. */
  id: string
  /** A unix timestamp representing when this post was created. */
  created: number
  /**
   * True if this post contains audio (only video formats support audio, the gif
   * image file format can not contain audio information).
   */
  hasaudio: boolean
  /**
   * An array of dictionaries with {@link GifFormat} as the key and
   * {@link MediaObject} as the value.
   */
  media: Array<Record<Formats, MediaObject>>
  /** An array of tags for the post. */
  tags: string[]
  /** The title of the post. */
  title: string
  /** The full URL to view the post on tenor.com. */
  itemurl: string
  /** True if this post contains captions. */
  hascaption: boolean
  /** A short URL to view the post on tenor.com. */
  url: string
}

export interface MediaObject {
  /** A url to a preview image of the media source. */
  preview: string
  /** A url to the media source. */
  url: string
  /** Width and height in pixels. */
  dims: [number, number]
  /** Size of file in bytes. */
  size: number
}

export type GifFormat =
  | 'gif'
  | 'mediumgif'
  | 'tinygif'
  | 'nanogif'
  | 'mp4'
  | 'loopedmp4'
  | 'tinymp4'
  | 'nanomp4'
  | 'webm'
  | 'tinywebm'
  | 'nanowebm'

export interface ApiError {
  /** An optional numeric code. */
  code: number
  /** A string message describing the error. */
  error: string
}

/*
███████ ███    ██ ██████  ██████   ██████  ██ ███    ██ ████████     ████████ ██    ██ ██████  ███████ ███████
██      ████   ██ ██   ██ ██   ██ ██    ██ ██ ████   ██    ██           ██     ██  ██  ██   ██ ██      ██
█████   ██ ██  ██ ██   ██ ██████  ██    ██ ██ ██ ██  ██    ██           ██      ████   ██████  █████   ███████
██      ██  ██ ██ ██   ██ ██      ██    ██ ██ ██  ██ ██    ██           ██       ██    ██      ██           ██
███████ ██   ████ ██████  ██       ██████  ██ ██   ████    ██           ██       ██    ██      ███████ ███████
*/

export interface CommonOptions {
  /** Client key. You may use `LIVDSRZULELA` for testing. */
  key: string
  /**
   * Default language to interpret search string.
   *
   * @default `en_US`
   */
  locale?: string
  /**
   * Specify the content safety filter level. Possible values:
   *
   * - **High** - G
   * - **Medium** - G and PG
   * - **Low** - G, PG, and PG-13
   * - **Off** - G, PG, PG-13, and R (no nudity)
   *
   * @default `off`
   * @see https://tenor.com/gifapi/documentation#contentfilter
   */
  contentfilter?: 'off' | 'low' | 'medium' | 'high'
  /**
   * Filter the response GIF_OBJECT list to only include GIFs with aspect ratios
   * that fit with in the selected range.
   *
   * - **All** - no constraints
   * - **Wide** - 0.42 <= aspect ratio <= 2.36
   * - **Standard** - .56 <= aspect ratio <= 1.78
   *
   * @default `all`
   */
  ar_range?: 'all' | 'wide' | 'standard'
  /**
   * Fetch up to a specified number of results (max: 50).
   *
   * @default 20
   */
  limit?: number
  /**
   * GGt results starting at position "value". Use a non-zero "next" value
   * returned by API results to get the next set of results.
   */
  pos?: string
  /** Specify the anonymous_id tied to the given user. */
  anon_id?: string
}

export interface CommonSearchOptions extends CommonOptions {
  /** Search string. */
  q: string
}
export interface CommonResults<Formats extends string = GifFormat> {
  next: string
  results: GifObject<Formats>[]
}
export type MinimalResults = CommonResults<'gif' | 'tinygif' | 'mp4'>
export type BasicResults = CommonResults<
  'gif' | 'tinygif' | 'nanogif' | 'mp4' | 'tinymp4' | 'nanomp4'
>

/*
███████ ███    ██ ██████  ██████   ██████  ██ ███    ██ ████████ ███████
██      ████   ██ ██   ██ ██   ██ ██    ██ ██ ████   ██    ██    ██
█████   ██ ██  ██ ██   ██ ██████  ██    ██ ██ ██ ██  ██    ██    ███████
██      ██  ██ ██ ██   ██ ██      ██    ██ ██ ██  ██ ██    ██         ██
███████ ██   ████ ██████  ██       ██████  ██ ██   ████    ██    ███████
*/

/** Creates an endpoint. */
export const endpoint = <Input, Output>(name: string) => async (
  options: Input
): Promise<Output> => {
  const url = new URL(`https://g.tenor.com/v1/${name}`)
  for (const [name, value] of Object.entries(options))
    if (value !== undefined) url.searchParams.set(name, value.toString())

  const response = await fetch(url.toString())

  if (response.status >= 400) {
    const error = (await response.json()) as ApiError
    throw new Error(`${error.code}: ${error.error}`)
  }

  return response.json() as Promise<Output>
}

/** All endpoints, untyped. */
export const endpoints = {
  search: endpoint('search'),
  trending: endpoint('trending'),
  categories: endpoint('categories'),
  searchSuggestions: endpoint('search_suggestions'),
  autocomplete: endpoint('autocomplete'),
  trendingTerms: endpoint('trending_terms'),
  registerShare: endpoint('registershare'),
}

/** Searches for GIFs. */
export async function search(
  options: CommonSearchOptions
): Promise<CommonResults>
export async function search(
  options: CommonSearchOptions & {
    /** Reduces the list of GIFs returned to tinygif, gif, and mp4. */
    media_filter: 'minimal'
  }
): Promise<MinimalResults>
export async function search(
  options: CommonSearchOptions & {
    /**
     * Reduces the list of GIFs returned to nanomp4, tinygif, tinymp4, gif, mp4,
     * and nanogif.
     */
    media_filter: 'basic'
  }
): Promise<BasicResults>
export async function search(options: unknown): Promise<unknown> {
  return endpoints.search(options)
}

/** Gets the current global trending GIFs. */
export async function trending(options: CommonOptions): Promise<CommonResults>
export async function trending(
  options: CommonOptions & {
    /** Reduces the list of GIFs returned to tinygif, gif, and mp4. */
    media_filter: 'minimal'
  }
): Promise<MinimalResults>
export async function trending(
  options: CommonOptions & {
    /**
     * Reduces the list of GIFs returned to nanomp4, tinygif, tinymp4, gif, mp4,
     * and nanogif.
     */
    media_filter: 'basic'
  }
): Promise<BasicResults>
export async function trending(options: unknown): Promise<unknown> {
  return endpoints.trending(options)
}

/** Gets a list of GIF categories. */
export async function categories(options: {
  key: string
  locale?: string
  type?: 'featured' | 'trending'
  contentfilter?: 'off' | 'low' | 'medium' | 'high'
  anon_id?: string
}): Promise<{
  tags: Array<{
    /** The search term that corresponds to the category. */
    searchterm: string
    /** The search url to request if the user selects the category. */
    path: string
    /** A url to the media source for the category's example GIF. */
    image: string
    /**
     * Category name to overlay over the image. The name will be translated to
     * match the locale of the corresponding request.
     */
    name: string
  }>
}>
export async function categories(options: {
  key: string
  locale?: string
  type: 'emoji'
  contentfilter?: 'off' | 'low' | 'medium' | 'high'
  anon_id?: string
}): Promise<{
  tags: Array<{
    /** The search term that corresponds to the category. */
    searchterm: string
    /** The search url to request if the user selects the category. */
    path: string
    /**
     * Category name to overlay over the image. The name will be translated to
     * match the locale of the corresponding request.
     */
    name: string
    /** Emoji. */
    character: string
  }>
}>
export async function categories(options: unknown): Promise<unknown> {
  return endpoints.categories(options)
}

/** Gets related search terms to find a more precise GIF. */
export async function searchSuggestions(options: {
  key: string
  q: string
  locale?: string
  limit?: number
  anon_id?: string
}): Promise<{ results: string[] }>
export async function searchSuggestions(options: unknown): Promise<unknown> {
  return endpoints.searchSuggestions(options)
}

/** Gets a list of completed search terms given a partial search term. */
export async function autocomplete(options: {
  key: string
  q: string
  locale?: string
  limit?: number
  anon_id?: string
}): Promise<{ results: string[] }>
export async function autocomplete(options: unknown): Promise<unknown> {
  return endpoints.autocomplete(options)
}

/** Gets current trending search terms. */
export async function trendingTerms(options: {
  key: string
  locale?: string
  limit?: number
  anon_id?: string
}): Promise<{ results: string[] }>
export async function trendingTerms(options: unknown): Promise<unknown> {
  return endpoints.trendingTerms(options)
}

/** Registers a user’s sharing of a GIF. */
export async function registerShare(options: {
  key: string
  id: string
  locale?: string
  q?: string
  anon_id?: string
}): Promise<{ status: 'ok' }>
export async function registerShare(options: unknown): Promise<unknown> {
  return endpoints.registerShare(options)
}
