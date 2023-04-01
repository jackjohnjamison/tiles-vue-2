<script setup>
  import { imageAssetPath } from '@/lib/constants'

  const portraitSrc = `${imageAssetPath}portraits/knight-sm.jpg`
</script>

<template>
  <section class="character-dialog pane">
    <img :src=portraitSrc />
    <div class=character-controls>
      <p>Kobol the knight</p>
      <button>&#x2694;</button>
      <button>&#x1F3F9;</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
   .character-dialog {
    position: absolute;
    bottom: 0;
    display: flex;
    margin: $space-small;
    padding: $space-small;

    img {
      display: block;
      border: solid 1px $primary;
    }

    .character-controls {
      margin: 0 $space-small;

      > * {
        margin: 0 $space-small $space-small 0;
      }
    }
  }
</style>