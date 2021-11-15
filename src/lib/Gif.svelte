<script lang="ts">
  import type { Gif } from './api'

  export let gif: Gif

  $: ({ description, width, height, gif: src } = gif)
</script>

<img {src} alt={description} {width} {height} class="gif" />

<style lang="scss">
  img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    vertical-align: bottom;
    background: linear-gradient(to right, purple, tomato);
  }
</style>
