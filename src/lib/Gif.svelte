<script lang="ts">
  import type { Gif } from './api'

  export let gif: Gif

  $: ({ description, width, height, preview, mp4, webm } = gif)
</script>

<video
  autoplay
  loop
  muted
  playsinline
  {width}
  {height}
  poster={preview}
  aria-label={description}
>
  <source src={webm} type="video/webm" />
  <source src={mp4} type="video/mp4" />
</video>

<style lang="scss">
  video {
    background: linear-gradient(to right, purple, tomato);
    max-width: 100%;
    max-height: 100%;
    vertical-align: bottom;
  }
</style>
