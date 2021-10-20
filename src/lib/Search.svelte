<script lang="ts">
  import type { CommonResults } from './api'
  import { search } from './api'
  import Grid from './Grid.svelte'

  export let key: string
  export let q: string
  export let limit = 20
  /** Number of pages to load. */
  export let n = 1

  let abort: undefined | ((value: void) => Promise<void>)
  let done: Promise<void>

  let pages: Array<CommonResults>

  const changeTerm = async (q: string) => {
    pages = []
    n = 1
    if (abort) await abort()
  }

  const loadPages = async (q: string, n: number) => {
    let markAsDone!: (value: void) => void
    done = new Promise((resolve) => {
      markAsDone = resolve
    })

    while (pages.length < n) {
      const pos = pages.length > 0 ? { pos: pages[pages.length - 1].next } : {}
      const page = await Promise.race([
        search({ q, key, limit, ...pos }),
        new Promise<void>((resolve) => {
          abort = () => {
            resolve()
            return done
          }
        }),
      ])
      if (page) pages = [...pages, page]
      else break
    }

    markAsDone()
  }

  $: changeTerm(q)
  $: loadPages(q, n)
  $: gifs = pages.flatMap((page) => page.results)
</script>

<Grid {gifs} on:click />
