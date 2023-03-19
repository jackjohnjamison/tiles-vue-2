<script setup>
  import { onMounted } from 'vue'
  import { start } from '@/lib/game'
  import ToolBar from './ToolBar.vue'
  import GameUi from './GameUi.vue'
  import PauseMenu from './PauseMenu.vue'

  let canvasRoot
  let floorCanvas
  let canvasMid
  let entityCanvas
  let canvasTop

  onMounted(() => {
    start({
      canvasRoot,
      floorCanvas,
      canvasMid,
      entityCanvas,
      canvasTop
    })
  })
</script>

<template>
  <ToolBar />
  <main class="canvasRoot" ref="canvasRoot">
    <canvas class="layer-canvas" ref="floorCanvas" />
    <canvas class="layer-canvas" ref="canvasMid" />
    <canvas class="layer-canvas" ref="entityCanvas" />
    <canvas class="layer-canvas canvas-top" ref="canvasTop" />
    <GameUi />
    <PauseMenu />
  </main>
</template>

<style lang="scss" scoped>
  .canvasRoot {
    flex: 1 1 auto;
    border: solid 1px var(--color-accent);
    margin: 5px 10px 10px;
    overflow: hidden;
    background-color: #000;
    position: relative;

    .layer-canvas {
      position: absolute;
    }

    .canvas-top {
      mix-blend-mode: hard-light;
    }
  }
</style>