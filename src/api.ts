export interface GifObject<Formats extends string = GifFormat> {
  /** Tenor result identifier. */
  id: string
  /** A unix timestamp representing when this post was created. */
  created: number
  /** True if this post contains audio (only video formats support audio, the gif image file format can not contain audio information). */
  hasaudio: boolean
  /** An array of dictionaries with {@link GifFormat} as the key and {@link MediaObject} as the value. */
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

export interface CategoryObject {
  /** The English search term that corresponds to the category. */
  searchterm: string
  /** The search url to request if the user selects the category. */
  path: string
  /** A url to the media source for the category's example GIF. */
  image: string
  /** Category name to overlay over the image. The name will be translated to match the locale of the corresponding request. */
  name: string
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

export interface CommonOptions {
  /** Client key. You may use `LIVDSRZULELA` for testing. */
  key: string
  /** Default language to interpret search string. */
  locale?: string
  contentfilter?: 'off' | 'low' | 'medium' | 'high'
  ar_range?: 'all' | 'wide' | 'standard'
  limit?: number
  pos?: string
  anon_id?: string
}
export interface CommonSearchOptions extends CommonOptions {
  /** A search string. */
  q: string
}
export interface CommonResults<Formats extends string = GifFormat> {
  next: string
  results: GifObject<Formats>[]
}

export const endpoint = <Input, Output>(name: string) => async (
  options: Input
): Promise<Output> => {
  const url = new URL(`https://g.tenor.com/v1/${name}`)
  for (const [name, value] of Object.entries(options))
    url.searchParams.set(name, value.toString())

  const response = await fetch(url.toString())

  if (response.status >= 400) {
    const error = (await response.json()) as ApiError
    throw new Error(`${error.code}: ${error.error}`)
  }

  return response.json() as Promise<Output>
}

export const endpoints = {
  search: endpoint('search'),
  trending: endpoint('trending'),
}

export async function search(
  options: CommonSearchOptions
): Promise<CommonResults>
export async function search(
  options: CommonSearchOptions & {
    media_filter: 'minimal'
  }
): Promise<CommonResults<'gif' | 'tinygif' | 'mp4'>>
export async function search(
  options: CommonSearchOptions & {
    media_filter: 'basic'
  }
): Promise<
  CommonResults<'gif' | 'tinygif' | 'nanogif' | 'mp4' | 'tinymp4' | 'nanomp4'>
>
export async function search(options: unknown): Promise<unknown> {
  return endpoints.search(options)
}

export async function trending(options: CommonOptions): Promise<CommonResults>
export async function trending(
  options: CommonOptions & {
    media_filter: 'minimal'
  }
): Promise<CommonResults<'gif' | 'tinygif' | 'mp4'>>
export async function trending(
  options: CommonOptions & {
    media_filter: 'basic'
  }
): Promise<
  CommonResults<'gif' | 'tinygif' | 'nanogif' | 'mp4' | 'tinymp4' | 'nanomp4'>
>
export async function trending(options: unknown): Promise<unknown> {
  return endpoints.trending(options)
}

export const autocomplete = endpoint<
  { key: string; q: string; locale?: string; limit?: number; anon_id?: string },
  { results: string[] }
>('autocomplete')
