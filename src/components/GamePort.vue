<script setup>
  import { onMounted } from 'vue'
  import { start } from '@/lib/game'
  import ToolBar from './ToolBar.vue'
  import GameUi from './GameUi.vue'
  import PauseMenu from './PauseMenu.vue'

  const canvases = {}

  onMounted(() => {
    start(canvases)
  })
</script>

<template>
  <ToolBar />
  <main class="canvasRoot" :ref="function(el) { canvases.canvasRoot = el }">
    <canvas class="layer-canvas" :ref="function(el) { canvases.floorCanvas = el }" />
    <canvas class="layer-canvas" :ref="function(el) { canvases.canvasMid = el }" />
    <canvas class="layer-canvas" :ref="function(el) { canvases.entityCanvas = el }" />
    <canvas class="layer-canvas canvas-top" :ref="function(el) { canvases.canvasTop = el }" />
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