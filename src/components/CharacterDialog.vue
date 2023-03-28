<script setup>
  import { imageAssetPath } from '@/lib/constants'

  const portraitSrc = `${imageAssetPath}portraits/knight-sm.jpg`
</script>

<template>
  <section class=character-dialog>
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
    margin: 5px;
    padding: 10px;
    background-color: rgba(80, 80, 80, 0.8);
    backdrop-filter: var(--frostedFilter);
    border-radius: 2px;

    img {
      display: block;
      border: solid 1px #639;
    }

    p {
      margin: 0;
    }
  }
</style>