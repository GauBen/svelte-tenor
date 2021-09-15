<script lang="ts">
  import type { GifFormat, MediaObject } from '../api'

  export let medium: Record<GifFormat, MediaObject>
  export let formats: GifFormat[] = ['webm', 'mp4']

  const mime = {
    mp4: 'mp4',
    loopedmp4: 'mp4',
    tinymp4: 'mp4',
    nanomp4: 'mp4',
    webm: 'webm',
    tinywebm: 'webm',
    nanowebm: 'webm',
  }

  $: width = medium[formats[0]].dims[0]
  $: height = medium[formats[0]].dims[1]
  $: preview = medium[formats[0]].preview
</script>

<video
  autoplay
  loop
  muted
  playsinline
  {width}
  {height}
  poster={preview}
  tabindex="-1"
>
  {#each formats as format}
    <source src={medium[format].url} type="video/{mime[format]}" />
  {/each}
</video>

<style lang="scss">
  video {
    background: linear-gradient(to right, purple, tomato);
    max-width: 100%;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
