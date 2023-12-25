<script lang="ts">
  import type { GifObject } from "./api.js";

  const { ...props } = $props<GifObject>();
</script>

<img class="gif" {...props} />
