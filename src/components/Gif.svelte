<script lang="ts">
  import type { GifFormat, MediaObject } from '../api'

  export let medium: Record<GifFormat, MediaObject>
  export let formats: GifFormat[]
  export let columnWidth = 260

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
  style={`grid-row-end: span ${Math.ceil((columnWidth * height) / width / 16)}`}
>
  <source src={medium.webm.url} type="video/webm" />
  <source src={medium.mp4.url} type="video/mp4" />
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
