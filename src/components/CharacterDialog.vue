<script setup>
  import { imageAssetPath } from '@/lib/constants'

  const portraitSrc = `${imageAssetPath}portraits/knight-sm.jpg`
</script>

<template>
  <section class=character-dialog>
    <img :src=portraitSrc />
  </section>
</template>

<style lang="scss" scoped>
  .character-dialog {
    position: absolute;
    bottom: 0;

    img {
      display: block;
      margin: 2px;
      border: solid 1px #639;
    }
  }
</style>