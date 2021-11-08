/**
 * A Tenor API with better naming conventions.
 *
 * @module
 */
import { search as rawSearch } from './raw-api'

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

export interface SearchOptions {
  key: string
  q: string
  locale?: string
}

export interface SearchResult {
  results: Gif[]
  next: string
}

/** Searches for GIFs. */
export const search = async ({
  key,
  q,
}: SearchOptions): Promise<SearchResult> => {
  const { results, next } = await rawSearch({ key, q })
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
