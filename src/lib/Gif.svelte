<script lang="ts">
  import type { Gif } from './api'

  export let gif: Gif

  $: ({ description, width, height, gif: src } = gif)
</script>

<img {src} alt={description} {width} {height} />

<style lang="scss">
  img {
    background: linear-gradient(to right, purple, tomato);
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    vertical-align: bottom;
  }
</style>
